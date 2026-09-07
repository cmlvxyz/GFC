// GFC/bootstrap-data.js
import { DEFAULT_EVENTS, DEFAULT_SERMONS, DEFAULT_PRAYERS, DEFAULT_ATTENDEES, DEFAULT_ANNOUNCEMENTS, DEFAULT_TESTIMONIALS } from './src/data/churchData.ts';

const API_URL = 'http://localhost:4000';

async function bootstrapData() {
  try {
    console.log('📤 Bootstrapping data to GFC-DATA backend...');
    
    const response = await fetch(`${API_URL}/api/bootstrap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        events: DEFAULT_EVENTS,
        sermons: DEFAULT_SERMONS,
        prayers: DEFAULT_PRAYERS,
        attendees: DEFAULT_ATTENDEES,
        members: [],
        announcements: DEFAULT_ANNOUNCEMENTS,
        testimonials: DEFAULT_TESTIMONIALS
      })
    });

    if (response.ok) {
      console.log('✅ Data bootstrapped successfully!');
      const data = await response.json();
      console.log('📊 Events imported:', data.events.length);
      console.log('📊 Sermons imported:', data.sermons.length);
      console.log('📊 Prayers imported:', data.prayers.length);
      console.log('📊 Attendees imported:', data.attendees.length);
      console.log('📊 Announcements imported:', data.announcements.length);
      console.log('📊 Testimonials imported:', data.testimonials.length);
    } else {
      const error = await response.text();
      console.error('❌ Failed to bootstrap data:', error);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

bootstrapData();
