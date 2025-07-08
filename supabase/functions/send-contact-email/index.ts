import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
      type,
      artworkTitle,
      projectDetails
    } = await req.json()

    // Email content
    const emailSubject = type === 'commission' 
      ? `New Commission Request from ${name}`
      : `New Contact Message from ${name}`

    let emailBody = `
      <h2>${emailSubject}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
      ${artworkTitle ? `<p><strong>Artwork:</strong> ${artworkTitle}</p>` : ''}
      
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `

    if (type === 'commission' && projectDetails) {
      emailBody += `
        <h3>Project Details:</h3>
        ${projectDetails.projectType ? `<p><strong>Project Type:</strong> ${projectDetails.projectType}</p>` : ''}
        ${projectDetails.budget ? `<p><strong>Budget:</strong> ${projectDetails.budget}</p>` : ''}
        ${projectDetails.timeline ? `<p><strong>Timeline:</strong> ${projectDetails.timeline}</p>` : ''}
        ${projectDetails.reference ? `<p><strong>Reference:</strong> ${projectDetails.reference}</p>` : ''}
      `
    }

    // In a real implementation, you would use a service like Resend, SendGrid, or similar
    // For now, we'll just log the email content
    console.log('Email to send:', {
      to: Deno.env.get('CONTACT_EMAIL'),
      subject: emailSubject,
      html: emailBody
    })

    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1000))

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})