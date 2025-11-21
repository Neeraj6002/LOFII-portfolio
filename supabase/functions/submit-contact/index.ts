import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: ContactFormData = await req.json();

    console.log("Contact form submission received:", { name, email });

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate length limits
    if (name.length > 100 || email.length > 255 || message.length > 1000) {
      return new Response(
        JSON.stringify({ error: "Input exceeds maximum length" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Store submission in database
    const { data: submission, error: dbError } = await supabaseClient
      .from("contact_submissions")
      .insert({
        name,
        email,
        phone: phone || null,
        message,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save submission");
    }

    console.log("Submission saved to database:", submission.id);

    // Send notification email to LOFII team
    try {
      const { error: emailError } = await resend.emails.send({
        from: "LOFII Contact <onboarding@resend.dev>",
        to: ["lofiidigital@gmail.com"],
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr>
          <p><small>Submission ID: ${submission.id}</small></p>
          <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
        `,
      });

      if (emailError) {
        console.error("Email error:", emailError);
        // Don't fail the request if email fails
      } else {
        console.log("Notification email sent successfully");
      }
    } catch (emailErr) {
      console.error("Failed to send email:", emailErr);
      // Continue anyway - form was still saved
    }

    // Send confirmation email to user
    try {
      await resend.emails.send({
        from: "LOFII Creative Studio <onboarding@resend.dev>",
        to: [email],
        subject: "We received your message!",
        html: `
          <h2>Thank you for contacting LOFII!</h2>
          <p>Hi ${name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p>Here's a copy of your message:</p>
          <blockquote style="border-left: 4px solid #4169e1; padding-left: 16px; margin: 16px 0;">
            ${message.replace(/\n/g, "<br>")}
          </blockquote>
          <p>Best regards,<br>
          <strong>The LOFII Team</strong><br>
          Trivandrum, Kerala</p>
        `,
      });
    } catch (confirmErr) {
      console.error("Failed to send confirmation email:", confirmErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Form submitted successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-contact function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
