import { images } from '../assets/';
// import Stats1 from '../Assets/images/svg/totalEarning.svg?react';
// import Stats2 from '../Assets/images/svg/newBookings.svg?react';
// import Stats3 from '../Assets/images/svg/newUsers.svg?react';
// import Stats4 from '../Assets/images/svg/newConsultant.svg?react';

// import { category } from './TableStatus';

export const notificationsData = {
  status: true,
  message: 'user notifications',
  detail: {
    notifications: {
      current_page: 1,
      data: [
        {
          id: '2fb2b0ba-4859-47c4-826c-1742a8ac39db',
          type: 'App\\Core\\Notifications\\PushNotification',
          notifiable_type: 'App\\Models\\Admin',
          notifiable_id: 1,
          data: {
            title: 'New Feedback',
            body: 'Restaurant Olympia Gilbert has submitted a Feedback',
            route: {
              name: 'admin.feedbacks.show',
              params: {
                id: 77,
              },
            },
          },
          read_at: '',
          created_at: '2024-06-14T10:42:45.000000Z',
          updated_at: '2024-06-14T10:42:45.000000Z',
        },
        {
          id: '31d6a0f8-d820-4afd-a1c7-e64abaf8796a',
          type: 'App\\Core\\Notifications\\PushNotification',
          notifiable_type: 'App\\Models\\Admin',
          notifiable_id: 1,
          data: {
            title: 'New Feedback',
            body: 'Branch Charles has submitted a Feedback',
            route: {
              name: 'admin.feedbacks.show',
              params: {
                id: 74,
              },
            },
          },
          read_at: null,
          created_at: '2024-06-06T12:03:40.000000Z',
          updated_at: '2024-06-06T12:03:40.000000Z',
        },
        {
          id: '3e380bad-85bf-411a-ab5a-ed3977bf179c',
          type: 'App\\Core\\Notifications\\PushNotification',
          notifiable_type: 'App\\Models\\Admin',
          notifiable_id: 1,
          data: {
            title: 'New Feedback',
            body: 'Restaurant Britanney Mcbride has submitted a Feedback',
            route: {
              name: 'admin.feedbacks.show',
              params: {
                id: 71,
              },
            },
          },
          read_at: '',
          created_at: '2024-05-30T13:20:22.000000Z',
          updated_at: '2024-05-30T13:20:22.000000Z',
        },
        {
          id: '6169abb9-24cb-4f47-9bb4-74bc886dfa5a',
          type: 'App\\Core\\Notifications\\PushNotification',
          notifiable_type: 'App\\Models\\Admin',
          notifiable_id: 1,
          data: {
            title: 'New Feedback',
            body: 'Branch Charles has submitted a Feedback',
            route: {
              name: 'admin.feedbacks.show',
              params: {
                id: 78,
              },
            },
          },
          read_at: null,
          created_at: '2024-06-25T11:16:18.000000Z',
          updated_at: '2024-06-25T11:16:18.000000Z',
        },
        {
          id: '704674e3-84c6-4de4-878e-5f6a53a1c16a',
          type: 'App\\Core\\Notifications\\PushNotification',
          notifiable_type: 'App\\Models\\Admin',
          notifiable_id: 1,
          data: {
            title: 'New Feedback',
            body: 'Restaurant Kiona Phelps has submitted a Feedback',
            route: {
              name: 'admin.feedbacks.show',
              params: {
                id: 72,
              },
            },
          },
          read_at: null,
          created_at: '2024-05-30T13:21:05.000000Z',
          updated_at: '2024-05-30T13:21:05.000000Z',
        },
        {
          id: '7b4774e0-0326-4481-8a33-044c1c047810',
          type: 'App\\Core\\Notifications\\PushNotification',
          notifiable_type: 'App\\Models\\Admin',
          notifiable_id: 1,
          data: {
            title: 'New Feedback',
            body: 'User Charles has submitted a Feedback',
            route: {
              name: 'admin.feedbacks.show',
              params: {
                id: 81,
              },
            },
          },
          read_at: null,
          created_at: '2024-06-25T11:17:25.000000Z',
          updated_at: '2024-06-25T11:17:25.000000Z',
        },
        {
          id: '91740da1-89df-407b-a2c0-042ed28a1468',
          type: 'App\\Core\\Notifications\\PushNotification',
          notifiable_type: 'App\\Models\\Admin',
          notifiable_id: 1,
          data: {
            title: 'New Feedback',
            body: 'Branch Peter Browning has submitted a Feedback',
            route: {
              name: 'admin.feedbacks.show',
              params: {
                id: 83,
              },
            },
          },
          read_at: null,
          created_at: '2024-06-26T11:22:54.000000Z',
          updated_at: '2024-06-26T11:22:54.000000Z',
        },
        {
          id: '9ff7d276-caa5-475d-845a-4d0359d0e91d',
          type: 'App\\Core\\Notifications\\PushNotification',
          notifiable_type: 'App\\Models\\Admin',
          notifiable_id: 1,
          data: {
            title: 'New Feedback',
            body: 'Restaurant Carissa Berg has submitted a Feedback',
            route: {
              name: 'admin.feedbacks.show',
              params: {
                id: 69,
              },
            },
          },
          read_at: null,
          created_at: '2024-05-30T11:21:32.000000Z',
          updated_at: '2024-05-30T11:21:32.000000Z',
        },
      ],
      first_page_url:
        'http://localhost/food_app/admin-api/notifications?page=1',
      from: 1,
      last_page: 2,
      last_page_url: 'http://localhost/food_app/admin-api/notifications?page=2',
      links: [
        {
          url: null,
          label: '&laquo; Previous',
          active: false,
        },
        {
          url: 'http://localhost/food_app/admin-api/notifications?page=1',
          label: '1',
          active: true,
        },
        {
          url: 'http://localhost/food_app/admin-api/notifications?page=2',
          label: '2',
          active: false,
        },
        {
          url: 'http://localhost/food_app/admin-api/notifications?page=2',
          label: 'Next &raquo;',
          active: false,
        },
      ],
      next_page_url: 'http://localhost/food_app/admin-api/notifications?page=2',
      path: 'http://localhost/food_app/admin-api/notifications',
      per_page: 10,
      prev_page_url: null,
      to: 10,
      total: 14,
    },
    total_notifications: 0,
  },
};

export const sidebar = [
  {
    id: 1,
    name: 'Abc',
    time: 'Today',
    message: 'Lorem ipsum dolor sit amet...',
    notification: '01',
    'photo-path':
      'https://media.istockphoto.com/id/186555801/photo/hes-the-bright-star-in-his-classroom.webp?b=1&s=612x612&w=0&k=20&c=VnxaoyQXcotPV_qTDbP06i7h8Kt2K-BCizq7_LIqGew=',
    isOpen: true,
    delivered: false,
  },
  {
    id: 1,
    name: 'Abc',
    time: '3 Days Ago',
    message: 'Lorem ipsum dolor sit amet...',
    notification: '01',
    'photo-path':
      'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=',
    isOpen: false,
    delivered: true,
  },
  {
    id: 1,
    name: 'Abc',
    time: '3 Days Ago',
    message: 'Lorem ipsum dolor sit amet...',
    notification: '01',
    'photo-path':
      'https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg',
    isOpen: false,
    delivered: true,
  },
  {
    id: 1,
    name: 'Abc',
    time: 'Today',
    message: 'Lorem ipsum dolor sit amet...',
    notification: '01',
    'photo-path': 'https://submeter.me/images/temp/400x450/img5.jpg',
    isOpen: true,
    delivered: false,
  },
  {
    id: 1,
    name: 'Abc',
    time: '3 Days Ago',
    message: 'Lorem ipsum dolor sit amet...',
    notification: '01',
    'photo-path':
      'https://media.istockphoto.com/id/1333838172/photo/indoor-headshot-portrait-of-cheerful-young-indian-female-businesswoman-student.jpg?s=612x612&w=0&k=20&c=GGPz0QlmMKYEt497R4HNRC8Pacha-lwpSe1fiqRwcjI=',
    isOpen: false,
    delivered: true,
  },
  {
    id: 1,
    name: 'Abc',
    time: '3 Days Ago',
    message: 'Lorem ipsum dolor sit amet...',
    notification: '01',
    'photo-path':
      'https://www.befunky.com/images/wp/wp-2022-12-social-media-profile-picture-2.jpg?auto=avif,webp&format=jpg&width=944',
    isOpen: false,
    delivered: true,
  },
  {
    id: 1,
    name: 'Abc',
    time: 'Today',
    message: 'Lorem ipsum dolor sit amet...',
    notification: '01',
    'photo-path':
      'https://media.istockphoto.com/id/1388253782/photo/positive-successful-millennial-business-professional-man-head-shot-portrait.jpg?s=612x612&w=0&k=20&c=uS4knmZ88zNA_OjNaE_JCRuq9qn3ycgtHKDKdJSnGdY=',
    isOpen: true,
    delivered: false,
  },
  {
    id: 1,
    name: 'Abc',
    time: '3 Days Ago',
    message: 'Lorem ipsum dolor sit amet...',
    notification: '01',
    'photo-path':
      'https://media.istockphoto.com/id/1154642632/photo/close-up-portrait-of-brunette-woman.jpg?s=612x612&w=0&k=20&c=d8W_C2D-2rXlnkyl8EirpHGf-GpM62gBjpDoNryy98U=',
    isOpen: false,
    delivered: true,
  },
  {
    id: 1,
    name: 'Abc',
    time: '3 Days Ago',
    message: 'Lorem ipsum dolor sit amet...',
    notification: '01',
    'photo-path':
      'https://media.istockphoto.com/id/1300972573/photo/pleasant-young-indian-woman-freelancer-consult-client-via-video-call.jpg?s=612x612&w=0&k=20&c=cbjgWR58DgUUETP6a0kpeiKTCxwJydyvXZXPeNTEOxg=',
    isOpen: false,
    delivered: true,
  },
];
export const dashboardChartDataOne = {
  heading: 'Total Earning',
  label: 'Total Earning',
  fill: true,
  data: [0, 30, 20, 40, 50, 60, 20, 80, 90, 50, 40, 120],
};

// Chart data for Total Users - format: [[label, value], [label, value], ...]
export const userChartData = [
  ['Jan', 1200],
  ['Feb', 1400],
  ['Mar', 1600],
  ['Apr', 1800],
  ['May', 2000],
  ['Jun', 2200],
  ['Jul', 2400],
  ['Aug', 2600],
  ['Sep', 2800],
  ['Oct', 3000],
  ['Nov', 3200],
  ['Dec', 3400]
];

// Chart data for Total Earnings - format: [[label, value], [label, value], ...]
export const earningChartData = [
  ['Jan', 15000],
  ['Feb', 18000],
  ['Mar', 22000],
  ['Apr', 25000],
  ['May', 28000],
  ['Jun', 32000],
  ['Jul', 35000],
  ['Aug', 38000],
  ['Sep', 42000],
  ['Oct', 45000],
  ['Nov', 48000],
  ['Dec', 52000]
];

// User Chart Data in cashBalanceData format
export const userChartDataFormatted = {
  type: 'bar',
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Total Users',
      data: [1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400],
      backgroundColor: ['#1f4047', '#fdc770'],
      borderWidth: 0,
      barThickness: 20,
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          maxTicksLimit: 6,
          font: {
            family: 'Poppins',
          },
        },
        beginAtZero: true,
      },
      x: {
        ticks: {
          font: {
            family: 'Poppins',
          },
        },
      },
    },
  },
};

// Earnings Chart Data in cashBalanceData format
export const earningChartDataFormatted = {
  type: 'bar',
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Total Earnings',
      data: [15000, 18000, 22000, 25000, 28000, 32000, 35000, 38000, 42000, 45000, 48000, 52000],
      backgroundColor: ['#1f4047', '#fdc770'],
      borderWidth: 0,
      barThickness: 20,
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          maxTicksLimit: 6,
          font: {
            family: 'Poppins',
          },
        },
        beginAtZero: true,
      },
      x: {
        ticks: {
          font: {
            family: 'Poppins',
          },
        },
      },
    },
  },
};
export const dashboardChartDataTwo = {
  heading: 'New Bookings Received',
  label: 'New Bookings Received',
  fill: true,
  data: [0, 30, 20, 40, 50, 60, 20, 80, 90, 50, 40, 120],
};
export const dashboardChartDataThree = {
  heading: 'New Users Registered',
  label: 'New Users Registered',
  fill: true,
  data: [10, 30, 20, 40, 50, 60, 20, 80, 90, 50, 40, 120],
};
export const dashboardChartDatafour = {
  heading: 'New Consultant Registered',
  label: 'New Consultant Registered',
  fill: true,

  data: [10, 30, 20, 40, 50, 60, 20, 80, 90, 50, 40, 120],
};

export const statsData = [
  {
    id: 1,
    text: "Total Revenue",
    number: "$40,689",
    increase: "8.5",
    sinceWeek: "Up from yesterday",
    image: "faDollarSign"
  },
  {
    id: 2,
    text: "Subscriptions", 
    number: "2,300",
    increase: "-2.1",
    sinceWeek: "Up from past week",
    image: "faUsers"
  },
  {
    id: 3,
    text: "Coach Engagement",
    number: "1,234",
    increase: "12.5",
    sinceWeek: "Up from yesterday",
    image: "faShoppingCart"
  }
];

export const headCoachManagementData = {
  status: true,
  message: 'user listing',
  detail: {
    current_page: 1,
    data: [
      {
        id: 1,
        first_name: 'Toms',
        last_name: 'Albert',
        mobile: '03656558478',
        school: 'School 1',
        email: 'darvesh@gmail.com',
        subscription_title: 'Monthly',
        status: 1,
        created_at: '2024-06-25T14:29:37.000000Z', 
        state: 'California',
        level: 'Abc',
        team_mascot: 'Abc',
      },
      {
        id: 2,
        first_name: 'Toms',
        last_name: 'Albert',
        mobile: '03656558478',
        school: 'School 1',
        email: 'darvesh@gmail.com',
        subscription_title: 'Monthly',
        status: 0,
        created_at: '2024-06-25T14:29:37.000000Z', 
        state: 'California',
        level: 'Abc',
        team_mascot: 'Abc',
      },
      {
        id: 3,
        first_name: 'Toms',
        last_name: 'Albert',
        mobile: '03656558478',
        school: 'School 1',
        email: 'darvesh@gmail.com',
        subscription_title: 'Monthly',
        status: 1,
        created_at: '2024-06-25T14:29:37.000000Z', 
        state: 'California',
        level: 'Abc',
        team_mascot: 'Abc',
      },
      {
        id: 4,
        first_name: 'Toms',
        last_name: 'Albert',
        mobile: '03656558478',
        school: 'School 1',
        email: 'darvesh@gmail.com',
        subscription_title: 'Monthly',
        status: 0,
        created_at: '2024-06-25T14:29:37.000000Z', 
        state: 'California',
        level: 'Abc',
        team_mascot: 'Abc',
      },
      {
        id: 5,
        first_name: 'Toms',
        last_name: 'Albert',
        mobile: '03656558478',
        school: 'School 1',
        email: 'darvesh@gmail.com',
        subscription_title: 'Monthly',
        status: 1,
        created_at: '2024-06-25T14:29:37.000000Z', 
        state: 'California',
        level: 'Abc',
        team_mascot: 'Abc',
      },
    ],
    first_page_url: 'http://localhost/food_app/admin-api/branches?page=1',
    from: 1,
    last_page: 2,
    last_page_url: 'http://localhost/food_app/admin-api/branches?page=2',
    links: [
      {
        url: null,
        label: '&laquo; Previous',
        active: false,
      },
      {
        url: 'http://localhost/food_app/admin-api/branches?page=1',
        label: '1',
        active: true,
      },
      {
        url: 'http://localhost/food_app/admin-api/branches?page=2',
        label: '2',
        active: false,
      },
      {
        url: 'http://localhost/food_app/admin-api/branches?page=2',
        label: 'Next &raquo;',
        active: false,
      },
    ],
    next_page_url: 'http://localhost/food_app/admin-api/branches?page=2',
    path: 'http://localhost/food_app/admin-api/branches',
    per_page: 10,
    prev_page_url: null,
    to: 10,
    total: 11,
  },
};

export const assistantCoachData = {
  status: true,
  message: 'user listing',
  detail: {
    current_page: 1,
    data: [
      {
        id: 1,
        first_name: 'Toms',
        last_name: 'Albert',
        email: 'darvesh@gmail.com',
        subscription_title: 'Monthly',
        created_at: '2024-06-25T14:29:37.000000Z',
        mobile: '03656558478',
        role: 'Assistant Coach',
        offence: 'Abc',
        defense: 'Abc',
      },
      {
        id: 2,
        first_name: 'Toms',
        last_name: 'Albert',
        email: 'darvesh@gmail.com',
        subscription_title: 'Monthly',
        created_at: '2024-06-25T14:29:37.000000Z',
        mobile: '03656558478',
        role: 'Assistant Coach',
        offence: 'Abc',
        defense: 'Abc',
      },
      {
        id: 3,
        first_name: 'Toms',
        last_name: 'Albert',
        email: 'darvesh@gmail.com',
        subscription_title: 'Monthly',
        created_at: '2024-06-25T14:29:37.000000Z',
        mobile: '03656558478',
        role: 'Assistant Coach',
        offence: 'Abc',
        defense: 'Abc',
      },
      {
        id: 4,
        first_name: 'Toms',
        last_name: 'Albert',
        email: 'darvesh@gmail.com',
        subscription_title: 'Monthly',
        created_at: '2024-06-25T14:29:37.000000Z',
        mobile: '03656558478',
        role: 'Assistant Coach',
        offence: 'Abc',
        defense: 'Abc',
      },
      {
        id: 5,
        first_name: 'Toms',
        last_name: 'Albert',
        email: 'darvesh@gmail.com',
        subscription_title: 'Monthly',
        created_at: '2024-06-25T14:29:37.000000Z',
        mobile: '03656558478',
        role: 'Assistant Coach',
        offence: 'Abc',
        defense: 'Abc',
      },
    ],
  },
};

export const totalEventsData = {
  status: true,
  message: 'user listing',
  detail: {
    current_page: 1,
    data: [
      {
        id: 1,
        event_name: 'Basketball Tournament',
        event_date: '2024-02-20',
        event_start_time: '10:00',
        event_end_time: '11:00',
        duration: '1 Hour',
        location: 'ABC School Gymnasium',
        assigned_to: 'John Doe',
        equipment: 'Basketballs, Nets, Scoreboard',
        attendance_required: 'Yes',
        event_focus: 'Team Building',
      },
      {
        id: 2,
        event_name: 'Basketball Tournament',
        event_date: '2025-02-20',
        event_start_time: '10:00',
        event_end_time: '11:30',
        duration: '1.5 Hours',
        location: 'ABC School Gymnasium',
        assigned_to: 'John Doe',
        equipment: 'Basketballs, Nets, Scoreboard',
        attendance_required: 'Yes',
        event_focus: 'Team Building',
      },
      {
        id: 3,
        event_name: 'Basketball Tournament',
        event_date: '2024-02-20',
        event_start_time: '10:00',
        event_end_time: '12:00',
        duration: '2 Hours',
        location: 'ABC School Gymnasium',
        assigned_to: 'John Doe',
        equipment: 'Basketballs, Nets, Scoreboard',
        attendance_required: 'Yes',
        event_focus: 'Team Building',
      },
      {
        id: 4,
        event_name: 'Basketball Tournament',
        event_date: '2024-02-20',
        event_start_time: '10:00',
        event_end_time: '12:30',
        duration: '2.51 Hours',
        location: 'ABC School Gymnasium',
        assigned_to: 'John Doe',
        equipment: 'Basketballs, Nets, Scoreboard',
        attendance_required: 'Yes',
        event_focus: 'Team Building',
      },
      {
        id: 5,
        event_name: 'Basketball Tournament',
        event_date: '2024-02-20',
        event_start_time: '10:00',
        event_end_time: '16:00',
        duration: 'Full Day',
        location: 'ABC School Gymnasium',
        assigned_to: 'John Doe',
        equipment: 'Basketballs, Nets, Scoreboard',
        attendance_required: 'Yes',
        event_focus: 'Team Building',
      },
    ],
  },
};

export const subscriptionCoachData = {
  status: true,
  message: 'user listing',
  detail: {
    current_page: 1,
    data: [
      {
        id: 1,
        subscription_title: 'Monthly',
        duration: '1 Month',
        total_amount: '$29.99',
        coupon: 'Abc',
        payment_date: '2024-06-25T14:29:37.000000Z',
        expiration: '2025-06-25T14:29:37.000000Z',
      },
      {
        id: 2,
        subscription_title: 'Monthly',
        duration: '1 Month',
        total_amount: '$29.99',
        coupon: 'Abc',
        payment_date: '2024-06-25T14:29:37.000000Z',
        expiration: '2025-06-25T14:29:37.000000Z',
      },
      {
        id: 3,
        subscription_title: 'Monthly',
        duration: '1 Month',
        total_amount: '$29.99',
        coupon: 'Abc',
        payment_date: '2024-06-25T14:29:37.000000Z',
        expiration: '2025-06-25T14:29:37.000000Z',
      },
      {
        id: 4,
        subscription_title: 'Monthly',
        duration: '1 Month',
        total_amount: '$29.99',
        coupon: 'Abc',
        payment_date: '2024-06-25T14:29:37.000000Z',
        expiration: '2025-06-25T14:29:37.000000Z',
      },
      {
        id: 5,
        subscription_title: 'Monthly',
        duration: '1 Month',
        total_amount: '$29.99',
        coupon: 'Abc',
        payment_date: '2024-06-25T14:29:37.000000Z',
        expiration: '2025-06-25T14:29:37.000000Z',
      },
    ],
  },
};

export const rosterData = {
  status: true,
  message: 'user listing',
  detail: {
    current_page: 1,
    data: [
      {
        id: 1,
        first_name: 'Toms',
        last_name: 'Albert',
        student_name: 'Toms',
        email: 'darvesh@gmail.com',
        mobile: '03656558478',
        dob: '2024-06-25T14:29:37.000000Z',
        grad_year: '2024',
        year: '2024',
        jersey_number: '12',
        Offence: 'Abc',
        Deffence: 'Abc',
        parent_info: {
          first_name: 'louis',
          last_name: 'Thomas',
          email: 'darvesh@gmail.com',
          mobile: '03656558478',
        }
      },
      {
        id: 2,
        first_name: 'Toms',
        last_name: 'Albert',
        student_name: 'Toms',
        email: 'darvesh@gmail.com',
        mobile: '03656558478',
        dob: '2024-06-25T14:29:37.000000Z',
        grad_year: '2024',
        year: '2024',
        jersey_number: '12',
        Offence: 'Abc',
        Deffence: 'Abc',
        parent_info: {
          first_name: 'Toms',
          last_name: 'Albert',
          email: 'darvesh@gmail.com',
          mobile: '03656558478',
        }
      },
      {
        id: 3,
        first_name: 'Toms',
        last_name: 'Albert',
        student_name: 'Toms',
        email: 'darvesh@gmail.com',
        mobile: '03656558478',
        dob: '2024-06-25T14:29:37.000000Z',
        grad_year: '2024',
        year: '2024',
        jersey_number: '12',
        Offence: 'Abc',
        Deffence: 'Abc',
        parent_info: {
          first_name: 'Toms',
          last_name: 'Albert',
          email: 'darvesh@gmail.com',
          mobile: '03656558478',
        }
      },
      {
        id: 4,
        first_name: 'Toms',
        last_name: 'Albert',
        student_name: 'Toms',
        email: 'darvesh@gmail.com',
        mobile: '03656558478',
        dob: '2024-06-25T14:29:37.000000Z',
        grad_year: '2024',
        year: '2024',
        jersey_number: '12',
        Offence: 'Abc',
        Deffence: 'Abc',
        parent_info: {
          first_name: 'Toms',
          last_name: 'Albert',
          email: 'darvesh@gmail.com',
          mobile: '03656558478',
        }
      },
      {
        id: 5,
        first_name: 'Toms',
        last_name: 'Albert',
        student_name: 'Toms',
        email: 'darvesh@gmail.com',
        mobile: '03656558478',
        dob: '2024-06-25T14:29:37.000000Z',
        grad_year: '2024',
        year: '2024',
        jersey_number: '12',
        Offence: 'Abc',
        Deffence: 'Abc',
        parent_info: {
          first_name: 'Toms',
          last_name: 'Albert',
          email: 'darvesh@gmail.com',
          mobile: '03656558478',
        }
      },
    ],
  },
};

export const queryManagementData = {
  status: true,
  message: 'user listing',
  detail: {
    current_page: 1,
    data: [
      {
        id: 1,
        user_name: 'Toms',
        email: 'darvesh@gmail.com',
        status: 1,
        created_at: '2024-06-25T14:29:37.000000Z',
        type: 'Student',
        subject: 'Inquiry about Customized Fitness Training Plans',
        message:
          'I hope this message finds you well. I am interested in improving my fitness levels and would like to inquire about the personalized fitness training plans you offer. Specifically, I am looking for guidance in the following areas',
      },
      {
        id: 2,
        user_name: 'Toms',
        email: 'darvesh@gmail.com',
        status: 0,
        created_at: '2024-06-25T14:29:37.000000Z',
        type: 'Assistant Coach',
        subject: 'Inquiry about Customized Fitness Training Plans',
        message:
          'I hope this message finds you well. I am interested in improving my fitness levels and would like to inquire about the personalized fitness training plans you offer. Specifically, I am looking for guidance in the following areas',
      },
      {
        id: 2,
        user_name: 'Toms',
        email: 'darvesh@gmail.com',
        phone: '03656558478',
        status: 0,
        created_at: '2024-06-25T14:29:37.000000Z',
        type: 'Coach',
        subject: 'Inquiry about Customized Fitness Training Plans',
        message:
          'I hope this message finds you well. I am interested in improving my fitness levels and would like to inquire about the personalized fitness training plans you offer. Specifically, I am looking for guidance in the following areas',
      },
    ],
    first_page_url: 'http://localhost/food_app/admin-api/branches?page=1',
    from: 1,
    last_page: 2,
    last_page_url: 'http://localhost/food_app/admin-api/branches?page=2',
    links: [
      {
        url: null,
        label: '&laquo; Previous',
        active: false,
      },
      {
        url: 'http://localhost/food_app/admin-api/branches?page=1',
        label: '1',
        active: true,
      },
      {
        url: 'http://localhost/food_app/admin-api/branches?page=2',
        label: '2',
        active: false,
      },
      {
        url: 'http://localhost/food_app/admin-api/branches?page=2',
        label: 'Next &raquo;',
        active: false,
      },
    ],
    next_page_url: 'http://localhost/food_app/admin-api/branches?page=2',
    path: 'http://localhost/food_app/admin-api/branches',
    per_page: 10,
    prev_page_url: null,
    to: 10,
    total: 11,
  },
};

export const promoManagementData = {
  status: true,
  message: "Appointment logs",
  detail: {
    current_page: 1,
    data: [
      {
        id: "1",
        promo_name: "Promo Abc 123",
        promo_discount: "05",
        date: "2024-06-25T14:29:37.000000Z",
      },
      {
        id: "2",
        promo_name: "Promo Abc",
        promo_discount: "10",
        date: "2024-06-25T14:29:37.000000Z",
      },
    ],
    first_page_url: "http://localhost/food_app/admin-api/branches?page=1",
    from: 1,
    last_page: 2,
    last_page_url: "http://localhost/food_app/admin-api/branches?page=2",
    links: [
      {
        url: null,
        label: "&laquo; Previous",
        active: false,
      },
      {
        url: "http://localhost/food_app/admin-api/branches?page=1",
        label: "1",
        active: true,
      },
      {
        url: "http://localhost/food_app/admin-api/branches?page=2",
        label: "2",
        active: false,
      },
      {
        url: "http://localhost/food_app/admin-api/branches?page=2",
        label: "Next &raquo;",
        active: false,
      },
    ],
    next_page_url: "http://localhost/food_app/admin-api/branches?page=2",
    path: "http://localhost/food_app/admin-api/branches",
    per_page: 10,
    prev_page_url: null,
    to: 10,
    total: 11,
  },
};
// Mock data for subscription logs
export const subscriptionLogsData = {
  detail: {
    data: [
      {
        id: 1,
        user_name: 'John Doe 1',
        email: 'john@example.com',
        school: 'School 1',
        school_name: 'School 1',
        type: 'Coach',
        duration: '1 Month',
        status: 'Active',
        status_detail: 'Active',
        created_at: '2024-01-15T10:30:00Z',
        expire_at: '2025-01-15T10:30:00Z',
        subscription_plan: 'Monthly',
        amount: '$29.99',
        payment_status: 'Paid'
      },
      {
        id: 2,
        user_name: 'Jane Smith',
        email: 'jane@example.com',
        school: 'School 2',
        school_name: 'School 2',
        type: 'Assistant Coach',
        duration: '1 Year',
        status: 'Inactive',
        status_detail: 'Inactive',
        created_at: '2024-01-14T15:45:00Z',
        expire_at: '2025-01-14T15:45:00Z',
        subscription_plan: 'Yearly',
        amount: '$99.99',
        payment_status: 'Pending'
      },
      {
        id: 3,
        user_name: 'Mike Johnson',
        email: 'mike@example.com',
        school: 'School 3',
        school_name: 'School 3',
        type: 'coach',
        duration: '1 Year',
        status: 'Active',
        status_detail: 'Active',
        created_at: '2024-01-13T09:20:00Z',
        expire_at: '2025-01-13T09:20:00Z',
        subscription_plan: 'Yearly',
        amount: '$29.99',
        payment_status: 'Paid'
      },
      {
        id: 4,
        user_name: 'Sarah Wilson',
        email: 'sarah@example.com',
        school: 'School 4',
        school_name: 'School 4',
        type: 'Assistant Coach',
        duration: '1 Year',
        status: 'Active',
        status_detail: 'Active',
        created_at: '2024-01-12T14:10:00Z',
        expire_at: '2025-01-12T14:10:00Z',
        subscription_plan: 'Yearly',
        amount: '$19.99',
        payment_status: 'Paid'
      },
      {
        id: 5,
        user_name: 'David Brown',
        email: 'david@example.com',
        school: 'School 5',
        school_name: 'School 5',
        type: 'Premium',
        duration: '1 Year',
        status: 'Inactive',
        status_detail: 'Inactive',
        created_at: '2024-01-11T11:55:00Z',
        expire_at: '2025-01-11T11:55:00Z',
        subscription_plan: 'Yearly',
        amount: '$299.99',
        payment_status: 'Failed'
      }
    ],
    total: 5,
    per_page: 10,
    current_page: 1,
    last_page: 1
  }
};

// Mock data for subscription plans
export const subscriptionPlansData = {
  detail: {
    data: [
      {
        id: 1,
        subscription_title: 'Monthly',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, numquam quis! Consequuntur id quis, doloremque accusamus voluptatibus ullam neque aperiam eligendi voluptatem esse ducimus minus voluptate? Cupiditate quisquam doloribus laudantium.',
        amount: 29.99,
        duration: '1_month',
        type: 'coach',
        status: 1,
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-15T10:30:00Z'
        
      },
      {
        id: 2,
        subscription_title: 'Yearly',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, numquam quis! Consequuntur id quis, doloremque accusamus voluptatibus ullam neque aperiam eligendi voluptatem esse ducimus minus voluptate? Cupiditate quisquam doloribus laudantium.',
        amount: 49.99,
        duration: '1_year',
        type: 'assistant_coach',
        status: 0,
        features: ['All Basic Features', 'Premium Feature 1', 'Premium Feature 2'],
        created_at: '2024-01-14T15:45:00Z',
        updated_at: '2024-01-15T10:30:00Z'
      },
      {
        id: 3,
        subscription_title: 'Monthly',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, numquam quis! Consequuntur id quis, doloremque accusamus voluptatibus ullam neque aperiam eligendi voluptatem esse ducimus minus voluptate? Cupiditate quisquam doloribus laudantium.',
        amount: 299.99,
        duration: '1_month',
        type: 'coach',
        status: '1',
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        created_at: '2024-01-13T09:20:00Z',
        updated_at: '2024-01-15T10:30:00Z'
      },
      {
        id: 4,
        subscription_title: 'Yearly',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, numquam quis! Consequuntur id quis, doloremque accusamus voluptatibus ullam neque aperiam eligendi voluptatem esse ducimus minus voluptate? Cupiditate quisquam doloribus laudantium.',
        amount: 499.99,
        duration: '1_year',
        type: 'assistant_coach',
        status: '0',
        features: ['All Basic Features', 'Premium Feature 1', 'Premium Feature 2'],
        created_at: '2024-01-12T14:10:00Z',
        updated_at: '2024-01-15T10:30:00Z'
      }
    ],
    total: 4,
    per_page: 10,
    current_page: 1,
    last_page: 1
  }
};