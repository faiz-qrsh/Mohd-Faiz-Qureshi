(function () {
  "use strict";
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }


  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }


  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)


  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }


  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }


  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })


  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });


  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }


  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }


  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Skills slider
   */
  new Swiper('.testimonials-slider', {
    speed: 500,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()


function putDetails() {
  var contentID;
  s = location.search;
  if (s != '') {
    var split = s.split('=');
    contentID = split[1];
  }
  let para1 = document.getElementById('para1');
  let para2 = document.getElementById('para2');
  let name = document.getElementById('name');
  let category = document.getElementById('category');
  let tech = document.getElementById('tech');
  let date = document.getElementById('date');
  let link = document.getElementById('link');
  let association = document.getElementById('association');
  let git = "https://github.com/faiz-qrsh/";
  switch (contentID) {
    case '1':
      para1.innerHTML = "EliteDwell Sol revolutionizes the landscape of home services, offering an extensive array of solutions ranging from fundamental plumbing and electrical services to specialized tailoring and more. Our platform is meticulously crafted to address the diverse needs of contemporary homeowners, providing a comprehensive hub for all their household requirements. Central to EliteDwell Sol is an advanced chatbot interface facilitating seamless communication between users and service providers, ensuring swift assistance and query resolution. Moreover, our platform integrates email confirmations and streamlined workflows to elevate the user experience, ensuring transparency and reliability throughout the service delivery process.";
      para2.innerHTML = "Complementing its core functionalities, EliteDwell Sol features a dedicated career portal, empowering skilled professionals to showcase their expertise and connect with a broad clientele. Through this innovative avenue, service providers can expand their business horizons and seize new opportunities, fostering a dynamic ecosystem of home service excellence. With EliteDwell Sol, homeowners can rest assured knowing that their domestic needs are met with efficiency, professionalism, and unparalleled convenience.";
      name.innerHTML = "EliteDwell Solution";
      category.innerHTML = "Website";
      date.innerHTML = "Dec 2023 - Feb 2024";
      link.href = git + "EliteDwell-Solution";
      tech.innerHTML = "Java, Spring, Hibernate, MVC Architecture, MySQL, HTML, CSS, JavaScript, Bootstrap";
      association.innerHTML = "Academic Project";
      break;
    case '2':
      para1.innerHTML = "The Online Exam Portal website represents a cutting-edge solution tailored to meet the evolving needs of educational institutions and organizations. Offering a versatile platform for exam management, the portal facilitates seamless creation and administration of various exam formats, providing educators and administrators with unprecedented flexibility and control. From traditional multiple-choice assessments to complex essay-based exams, the portal accommodates diverse testing requirements, ensuring comprehensive coverage across academic disciplines.";
      para2.innerHTML = "Central to the Online Exam Portal's functionality is its intuitive user interface, designed to streamline the exam-taking experience for students and candidates. With user-friendly navigation and responsive design, the portal ensures optimal accessibility across devices, empowering users to engage with assessments anytime, anywhere. Additionally, robust security measures are implemented to safeguard the integrity of exams, including secure authentication protocols and encryption techniques to prevent unauthorized access and ensure data confidentiality. Moreover, the Online Exam Portal offers real-time result processing capabilities, enabling instant feedback and analysis for both administrators and test-takers. Through advanced reporting features and analytics tools, educators gain valuable insights into student performance trends, facilitating data-driven decision-making and targeted interventions to enhance learning outcomes. With its comprehensive suite of features and commitment to innovation, the Online Exam Portal stands as a catalyst for academic excellence, empowering institutions to adapt and thrive in today's digital learning landscape.";
      name.innerHTML = "Quizsterly";
      category.innerHTML = "Website";
      date.innerHTML = "Apr 2023 - May 2023";
      link.href = git + "Online-Examination-Portal";
      tech.innerHTML = "Java, J2EE, HTML, CSS, MySQL";
      association.innerHTML = "Personal Project";
      break;
    case '3':
      para1.innerHTML = "The Event Management Website is a sophisticated platform tailored to streamline and elevate the process of organizing and hosting events of all scales and types. Designed with versatility and efficiency in mind, the website offers a comprehensive suite of tools and features to facilitate seamless event planning, coordination, and execution. From corporate conferences and trade shows to weddings and social gatherings, the platform caters to the diverse needs of event organizers, providing them with the resources and support necessary to create memorable and successful experiences.";
      para2.innerHTML = "At the heart of the Event Management Website is its intuitive interface, which empowers users to effortlessly navigate through the event planning process. With customizable templates, event organizers can easily create and customize event pages, complete with event details, schedules, ticketing options, and interactive maps. The platform also integrates robust communication tools, allowing organizers to efficiently communicate with attendees, sponsors, and vendors, ensuring clear and timely information dissemination throughout the event lifecycle. Furthermore, the Event Management Website offers powerful analytics and reporting capabilities, enabling organizers to gain valuable insights into event performance metrics, attendee demographics, and engagement levels. Armed with this data-driven intelligence, organizers can make informed decisions to optimize future events and maximize return on investment. With its seamless user experience, advanced features, and commitment to excellence, the Event Management Website sets a new standard for event planning and execution, empowering organizers to create unforgettable experiences that leave a lasting impact.";
      name.innerHTML = "RegEase";
      category.innerHTML = "Website";
      date.innerHTML = "Jul 2022 - Aug 2022";
      link.href = git + "Event-Management";
      tech.innerHTML = "Java, J2EE, JSP, HTML, CSS, MySQL";
      association.innerHTML = "Personal Project";
      break;
    case '4':
      para1.innerHTML = "The Grievance Android App developed for SRMS College offers a streamlined platform for students and faculty to address and resolve grievances effectively. Through this app, users can submit their complaints or concerns regarding various aspects of college life, including academics, infrastructure, or administrative issues. The app facilitates seamless communication between users and college authorities, ensuring timely response and resolution of grievances.";
      para2.innerHTML = "Equipped with features such as real-time notifications and status updates, the Grievance Android App keeps users informed about the progress of their complaints and fosters transparency in the grievance redressal process. Moreover, the app includes functionalities for categorizing grievances based on their nature and severity, enabling college administrators to prioritize and address them efficiently. With its user-friendly interface and robust functionality, the app serves as a valuable tool for enhancing communication and addressing concerns within the college community.";
      name.innerHTML = "SRMS Grievance App";
      category.innerHTML = "Android App";
      date.innerHTML = "Sep 2022 - Jan 2023";
      link.href = git + "GrievanceApp";
      tech.innerHTML = "XML, Java, Firebase";
      association.innerHTML = "SRMS App Development Cell";
      break;
    case '5':
      para1.innerHTML = "The Audio Extractor Android application offers a user-friendly interface for extracting audio from video files with unparalleled ease. Utilizing the FFMPEG library, renowned for its versatility and efficiency, the app ensures seamless processing of various video formats. Whether it's extracting soundtracks from movies, music videos, or personal recordings, users can rely on the app's robust functionality to obtain high-quality audio files quickly and effortlessly";
      para2.innerHTML = "With the Audio Extractor app, users can enjoy the convenience of extracting audio on the go, directly from their Android devices. The app's intuitive design and streamlined workflow make it accessible to users of all levels, from casual enthusiasts to professional editors. By harnessing the power of the FFMPEG library, the app delivers reliable performance and consistent results, ensuring that users can extract audio from their video files with confidence and precision.";
      name.innerHTML = "Audio Extracter";
      category.innerHTML = "Andoid App";
      date.innerHTML = "Jun 2023 - Jul 2023";
      link.href = git + "AudioExtracter";
      tech.innerHTML = "XML, Java, FFMPEG Library";
      association.innerHTML = "CodeClause Pvt. Ltd. Internship";
      break;

    case '6':
      para1.innerHTML = "The WhatsApp Clone Android application offers a robust messaging platform that mirrors the functionality and user experience of the popular WhatsApp messenger. With features such as real-time messaging, voice calls, group chats, and multimedia sharing, the app provides users with a seamless communication experience. Built with modern technologies and scalable architecture, the app ensures fast and reliable messaging, even in low-bandwidth environments, making it suitable for users worldwide.";
      para2.innerHTML = "Designed with a focus on user privacy and security, the WhatsApp Clone app incorporates end-to-end encryption for all messages and media shared between users. Additionally, the app includes features such as two-factor authentication and fingerprint authentication to safeguard user accounts from unauthorized access. With its intuitive interface and comprehensive feature set, the WhatsApp Clone app aims to provide users with a familiar and secure messaging platform that meets their communication needs.";
      name.innerHTML = "Chitti";
      category.innerHTML = "Andoid App";
      date.innerHTML = "Feb 2023 - May 2023";
      link.href = git + "Chitti";
      tech.innerHTML = "XML, Java, Firebase";
      association.innerHTML = "Personal Project";
      break;

    case '7':
      para1.innerHTML = "The Android application Chatbot revolutionizes user interaction through intelligent conversational interfaces. Leveraging natural language processing (NLP) and machine learning algorithms, the app interprets user queries and responds with relevant and contextually accurate information. From answering frequently asked questions to providing personalized recommendations, the Chatbot app streamlines user interactions and enhances user engagement across various domains.";
      para2.innerHTML = "With its sleek and user-friendly interface, the Chatbot app offers a seamless conversational experience, allowing users to interact with the app effortlessly. Whether it's seeking assistance with customer support inquiries, booking appointments, or accessing information on-demand, the app serves as a virtual assistant that caters to users' needs in real-time. By harnessing the power of AI-driven conversational technology, the Chatbot app aims to redefine user engagement and empower businesses to deliver exceptional customer experiences.";
      name.innerHTML = "MyBot";
      category.innerHTML = "Android App";
      date.innerHTML = "Mar 2023";
      link.href = "N/A";
      tech.innerHTML = "XML, Java";
      association.innerHTML = "Personal Project";
      break;

    case '9':
      para1.innerHTML = "The Android application Calculator is a versatile tool that offers users a convenient and efficient way to perform various mathematical calculations on their mobile devices. With a user-friendly interface and intuitive design, the app allows users to perform basic arithmetic operations such as addition, subtraction, multiplication, and division, as well as more complex functions like square roots, percentages, and exponentiation. Equipped with a responsive keypad and clear display, the Calculator app ensures accurate and reliable calculations, making it an essential utility for users in everyday scenarios.";
      para2.innerHTML = "";
      name.innerHTML = "Calculator App";
      category.innerHTML = "Android App";
      date.innerHTML = "Jun 2023 - Jul 2023";
      link.href = git + "Calculator-App";
      tech.innerHTML = "XML, Java";
      association.innerHTML = "CodeClause Pvt. Ltd. Internship";
      break;

    case '8':
      para1.innerHTML = "The Notes Android application offers a convenient and efficient way for users to capture, organize, and manage their notes and reminders on their mobile devices. With a simple and intuitive user interface, the app allows users to create notes, jot down thoughts, and set reminders effortlessly. Users can categorize their notes into different folders or tags, making it easy to find and access information when needed. Additionally, the app supports rich text formatting, enabling users to customize their notes with bold, italics, bullet points, and more, to suit their preferences.";
      para2.innerHTML = "Beyond basic note-taking functionality, the Notes app also provides advanced features such as cloud synchronization, allowing users to access their notes across multiple devices seamlessly. With automatic backup and sync capabilities, users can rest assured that their notes are safe and up-to-date, even if they switch devices or encounter technical issues. Furthermore, the app offers integration with popular productivity tools such as Google Calendar and Microsoft Outlook, enabling users to create tasks and reminders directly from their notes. Whether for personal use, work, or education, the Notes app serves as a reliable companion for users to stay organized and productive in their daily lives.";
      name.innerHTML = "MyNotes";
      category.innerHTML = "Android App";
      date.innerHTML = "Dec 2022";
      link.href = git + "Notes";
      tech.innerHTML = "XML, Java, SQLite";
      association.innerHTML = "Personal Project";
      break;

    case '10':
      para1.innerHTML = "The Simon Game Android application offers a modern adaptation of the classic Simon electronic game, providing users with an engaging and entertaining experience on their mobile devices. With its colorful and intuitive interface, the app challenges players to test their memory and reflexes by repeating a series of random sequences of colors and sounds. As players progress through the levels, the sequences become increasingly complex, offering a dynamic and immersive gameplay experience.";
      para2.innerHTML = "Built with user-friendly controls and responsive gameplay mechanics, the Simon Game app offers hours of addictive fun for players of all ages. Whether played solo to improve memory and concentration skills or in multiplayer mode to compete with friends and family, the app provides a stimulating and rewarding gaming experience. With its nostalgic charm and modern twist, the Simon Game app is sure to captivate and entertain players seeking a challenging and enjoyable mobile gaming experience.";
      name.innerHTML = "Simon Game";
      category.innerHTML = "Website";
      date.innerHTML = "Jan 2022";
      link.href = git + "Simon-Game";
      tech.innerHTML = "HTML, CSS, JavaScript";
      association.innerHTML = "Personal Project";
      break;

    case '11':
      para1.innerHTML = "The Network Security Implementation through Voice Biometric Android application is a cutting-edge solution designed to enhance network security by leveraging voice biometrics for user authentication. Through advanced voice recognition algorithms, the app verifies the identity of users based on their unique vocal characteristics, adding an extra layer of security to sensitive network systems and data.";
      para2.innerHTML = "Employing state-of-the-art encryption protocols and secure communication channels, the app ensures that user voice data remains confidential and protected from unauthorized access. By integrating voice biometrics into the network security framework, organizations can significantly reduce the risk of identity theft and unauthorized access to critical network resources, thereby bolstering the overall security posture of their IT infrastructure. With its innovative approach to network security, the Network Security Implementation through Voice Biometric app provides a robust and reliable solution for safeguarding sensitive information and maintaining the integrity of network systems.";
      name.innerHTML = "Voice Biometric";
      category.innerHTML = "Website";
      date.innerHTML = "Oct 2021 - Dec 2021";
      link.href = git + "Network-Security";
      tech.innerHTML = "HTML, CSS, Vanilla JavaScript";
      association.innerHTML = "Academic Project";
      break;

    case '12':
      para1.innerHTML = "The Banking App for Android offers a simplified yet comprehensive solution for managing banking transactions on-the-go. With features like account balance checking, fund transfers, transaction history tracking, and bill payments, the app provides users with easy access to essential banking services from their mobile devices. Built with user convenience in mind, the app offers a user-friendly interface and intuitive navigation, making it suitable for users of all levels of technical proficiency.";
      para2.innerHTML = "In addition to basic banking functionalities, the app prioritizes security by implementing robust authentication mechanisms, such as biometric authentication and multi-factor authentication. Furthermore, the app ensures the security of users' financial data through encryption protocols and adherence to industry-standard security practices. With its seamless combination of convenience and security, the Banking App aims to enhance the banking experience for users, empowering them to manage their finances efficiently and securely from anywhere, at any time.";
      name.innerHTML = "Banking App";
      category.innerHTML = "Website";
      date.innerHTML = "May 2023 - Jun 2023";
      link.href = git + "Virtoney";
      tech.innerHTML = "Java, XML, SQLite";
      association.innerHTML = "The Spark Foundation Internship";
      break;

      case '13':
      para1.innerHTML = "The Employee Check-in and Check-out Time Tracker Android application is a comprehensive solution designed to streamline and automate the process of monitoring employee attendance. By leveraging the GPS capabilities of mobile devices, the app accurately records the time when employees check in and out of their designated work locations. This real-time tracking functionality eliminates the need for manual attendance registers, reducing administrative overhead and ensuring accurate attendance records.";
      para2.innerHTML = "In addition to time tracking, the app offers features such as geofencing and notifications, allowing employers to define virtual boundaries around work locations and receive alerts when employees enter or leave these areas. With its user-friendly interface and robust functionality, the Employee Check-in and Check-out Time Tracker app empowers organizations to efficiently manage employee attendance, enhance productivity, and ensure compliance with labor regulations.";
      name.innerHTML = "Check Ins And Check Outs Tracker";
      category.innerHTML = "Website";
      date.innerHTML = "Jul 2023 - Aug 2023";
      link.href = git + "TimeTracker";
      tech.innerHTML = "Java, J2EE, HTML, CSS, MySQL";
      association.innerHTML = "CETPA Infotech Pvt. Ltd. Internship";
      break;
  }
}