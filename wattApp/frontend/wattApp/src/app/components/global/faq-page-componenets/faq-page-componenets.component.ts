import { Component } from '@angular/core';

@Component({
  selector: 'app-faq-page-componenets',
  templateUrl: './faq-page-componenets.component.html',
  styleUrls: ['./faq-page-componenets.component.css']
})
export class FaqPageComponenetsComponent {
  tabs = [
    { title: 'How does the app differ from other similar products on the market?', content: 'The application provides users with detailed reports on their energy production and consumption, as well as information on electricity storage. Users can monitor their energy consumption in real time and identify areas where the most energy is consumed. The app also provides detailed analysis of greenhouse gas emissions, allowing users to better understand their impact on the environment.' },
    { title: 'How can the production of energy from renewable sources be monitored?', content: 'Our application can monitor the production of energy from renewable sources through sensors for measuring production at different points in the system. This includes solar panels, wind farms and other sources of renewable energy.' },
    { title: 'What devices are supported for monitoring power consumption?', content: 'Our application supports a wide range of devices for monitoring power consumption, including power sensors, smart sockets, smart switches and other similar devices that are compatible with our system.' },
    { title: 'How does your application measure power consumption?', content: 'The application uses various sensors and devices to measure electricity consumption at different points in your home or business. This includes sensors for measuring current on main sockets, sensors for measuring consumption on individual devices and other technologies that are able to monitor the amount of electricity consumption.' },
    { title: 'What types of reports and analysis does the application provide?', content: 'The application provides various types of reports and analyses, including monthly power consumption reports, individual appliance consumption reports, energy savings reports, renewable energy production reports and other relevant information.' },
    { title: 'How can the production of energy from renewable sources be monitored?', content: 'Our application can monitor the production of energy from renewable sources through sensors for measuring production at different points in the system. This includes solar panels, wind farms and other sources of renewable energy.' },
    { title: 'How can alerts for high consumption or failures be configured?', content: 'The app allows users to set alerts for high consumption or outages via the mobile app or web interface. Users can also configure alerts via email or text messages to be notified of issues.' },
    { title: 'How is the security and privacy of user data ensured?', content: 'The security and privacy of our users data is very important to us. The application uses advanced encryption technologies and other security measures to ensure that all user data is protected. In addition, we adhere to a strict data privacy policy to ensure that our users data is always safe and secure.' },
    // add more tabs here
  ];
  activeTab = -1;

  toggleTab(index: number) {
    if (this.activeTab === index) {
      this.activeTab = -1;
    } else {
      this.activeTab = index;
    }
  }

}
