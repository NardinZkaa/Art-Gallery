import { supabase } from '../lib/supabase';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  type: 'contact' | 'commission';
  artworkTitle?: string;
  projectDetails?: {
    projectType?: string;
    budget?: string;
    timeline?: string;
    reference?: string;
  };
}

export class ContactService {
  static async submitContactForm(formData: ContactFormData): Promise<void> {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          type: formData.type,
          artwork_title: formData.artworkTitle,
          project_details: formData.projectDetails,
          status: 'new'
        });

      if (error) throw error;

      // Send email notification (this would be handled by an edge function)
      await this.sendEmailNotification(formData);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw new Error('Failed to submit contact form');
    }
  }

  private static async sendEmailNotification(formData: ContactFormData): Promise<void> {
    try {
      // Call edge function to send email
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        console.error('Error sending email notification:', error);
        // Don't throw error here as the form submission was successful
      }
    } catch (error) {
      console.error('Error calling email function:', error);
      // Don't throw error here as the form submission was successful
    }
  }

  static async getContactMessages(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      throw new Error('Failed to fetch contact messages');
    }
  }

  static async markMessageAsRead(messageId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: 'read' })
        .eq('id', messageId);

      if (error) throw error;
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw new Error('Failed to mark message as read');
    }
  }
}