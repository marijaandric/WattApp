import { Component } from '@angular/core';

@Component({
  selector: 'app-faq-page-componenets',
  templateUrl: './faq-page-componenets.component.html',
  styleUrls: ['./faq-page-componenets.component.scss']
})
export class FaqPageComponenetsComponent {
  tabs = [
    { title: 'How does your energy management application work?', content: 'Our energy management application uses the Internet of Things (IoT) and artificial intelligence (AI) to collect, analyze and predict electricity consumption and production within a customers microgrid. Network managers will be able to monitor the behavior of all system users and analyze consumption and production, as well as the state of system components.' },
    { title: 'Who can use your app?', content: 'Our electricity app can be used by anyone who wants to keep track of their energy usage and costs. It is particularly useful for individuals or households who want to monitor their energy consumption and take steps towards reducing their carbon footprint. The app is also suitable for businesses that want to manage and optimize their energy usage for cost savings and sustainability. It is also used by electricity distribution operators' },
    { title: 'Can the app reduce the cost of your electricity bill?', content: 'Yes, our app can help reduce the cost of your electricity bill. By collecting information about electricity consumption and production, our app can identify areas where too much energy is being used and suggest ways to reduce consumption.' },
    { title: 'Can the application predict future energy consumption?', content: 'Yes, our app uses artificial intelligence to analyze past patterns of energy consumption and production, in order to predict future consumption. This helps grid operators to plan and adjust the generation and distribution of electricity.' },
    { title: 'How can the production of energy from renewable sources be monitored?', content: 'Our application can monitor the production of energy from renewable sources through sensors for measuring production at different points in the system. This includes solar panels, wind farms and other sources of renewable energy.' },
    { title: 'What devices are supported for monitoring power consumption?', content: 'Our application supports a wide range of devices for monitoring power consumption, including power sensors, smart sockets, smart switches and other similar devices that are compatible with our system.' },
    { title: 'How does your application measure power consumption?', content: 'The application uses various sensors and devices to measure electricity consumption at different points in your home or business. This includes sensors for measuring current on main sockets, sensors for measuring consumption on individual devices and other technologies that are able to monitor the amount of electricity consumption.' },
    { title: 'What types of reports and analysis does the application provide?', content: 'The application provides various types of reports and analyses, including monthly power consumption reports, individual appliance consumption reports, energy savings reports, renewable energy production reports and other relevant information.' },
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
