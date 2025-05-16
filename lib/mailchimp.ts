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
  } catch (error: unknown) {
    // Check if the error is because the user is already subscribed
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      typeof (error as any).response === 'object' &&
      (error as any).response !== null &&
      'body' in (error as any).response &&
      typeof (error as any).response.body === 'object' &&
      (error as any).response.body !== null &&
      'title' in (error as any).response.body &&
      (error as any).response.body.title === 'Member Exists'
    ) {
      return {
        success: true,
        // Safely access detail assuming it might not exist or have the expected structure
        data: { id: (error as any).response.body.detail?.split('with the email ')?.[1]?.split(' already')?.[0] || 'unknown' },
        message: 'You are already subscribed!',
      };
    }

    console.error('Error adding subscriber to Mailchimp:', error);
    
    let errorMessage = 'An error occurred while subscribing';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string') {
      errorMessage = (error as any).message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}