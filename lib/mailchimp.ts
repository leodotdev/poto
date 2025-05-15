import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize the client
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g. "us1"
});

export async function addSubscriber(email: string) {
  try {
    const listId = process.env.MAILCHIMP_LIST_ID;
    
    if (!listId) {
      throw new Error('Mailchimp list ID is not defined');
    }

    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
    });

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    // Check if the error is because the user is already subscribed
    if (error.response && error.response.body && error.response.body.title === 'Member Exists') {
      return {
        success: true,
        data: { id: error.response.body.detail.split('with the email ')[1].split(' already')[0] },
        message: 'You are already subscribed!',
      };
    }

    console.error('Error adding subscriber to Mailchimp:', error);
    
    return {
      success: false,
      error: error.message || 'An error occurred while subscribing',
    };
  }
}