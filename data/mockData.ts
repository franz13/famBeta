export const mockTasks = [
  {
    id: 1,
    title: 'Strânge jucăriile din camera ta',
    description: 'Pune toate jucăriile la locul lor înainte de cină',
    points: 10,
    dueDate: 'Azi, 19:00',
    isCompleted: false,
    assignedTo: 'Andrei',
    assigneeImage: 'https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Curățenie'
  },
  {
    id: 2,
    title: 'Teme la matematică',
    description: 'Rezolvă exercițiile de la pagina 24',
    points: 15,
    dueDate: 'Mâine, 16:00',
    isCompleted: false,
    assignedTo: 'Andrei',
    assigneeImage: 'https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Școală'
  },
  {
    id: 3,
    title: 'Alimentează pisica',
    points: 5,
    dueDate: 'Azi, 20:00',
    isCompleted: true,
    assignedTo: 'Andrei',
    assigneeImage: 'https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Animale'
  },
  {
    id: 4,
    title: 'Spală vasele',
    description: 'Spală toate vasele după cină',
    points: 10,
    dueDate: 'Azi, 21:30',
    isCompleted: false,
    assignedTo: 'Maria',
    assigneeImage: 'https://images.pexels.com/photos/3771679/pexels-photo-3771679.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Curățenie'
  },
  {
    id: 5,
    title: 'Cumpărături săptămânale',
    description: 'Lapte, pâine, fructe, legume',
    points: 20,
    dueDate: 'Sâmbătă, 12:00',
    isCompleted: false,
    assignedTo: 'Tata',
    assigneeImage: 'https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Cumpărături'
  },
  {
    id: 6,
    title: 'Aspiră livingul',
    points: 15,
    dueDate: 'Mâine, 17:00',
    isCompleted: false,
    assignedTo: null,
    category: 'Curățenie'
  }
];

export const mockChallenges = {
  active: [
    {
      id: 1,
      title: 'Cine strânge cele mai multe jucării?',
      description: 'Provocare activă până duminică. Câștigătorul primește 50 de puncte și o înghețată!',
      timeLeft: 'Mai sunt 3 zile',
      participants: [
        {
          name: 'Andrei',
          imageUrl: 'https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=300',
          progress: '13 jucării'
        },
        {
          name: 'Maria',
          imageUrl: 'https://images.pexels.com/photos/3771679/pexels-photo-3771679.jpeg?auto=compress&cs=tinysrgb&w=300',
          progress: '10 jucării'
        }
      ]
    },
    {
      id: 2,
      title: 'Economisirea apei',
      description: 'Cine poate economisi cea mai multă apă timp de o săptămână? Monitorizați timpul petrecut la duș.',
      timeLeft: 'Mai sunt 5 zile',
      participants: [
        {
          name: 'Tata',
          imageUrl: 'https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=300',
          progress: '18 minute'
        },
        {
          name: 'Mama',
          imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
          progress: '15 minute'
        },
        {
          name: 'Andrei',
          imageUrl: 'https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=300',
          progress: '22 minute'
        },
        {
          name: 'Maria',
          imageUrl: 'https://images.pexels.com/photos/3771679/pexels-photo-3771679.jpeg?auto=compress&cs=tinysrgb&w=300',
          progress: '20 minute'
        }
      ]
    }
  ],
  activities: [
    {
      id: 1,
      title: 'Seară de jocuri de societate',
      imageUrl: 'https://images.pexels.com/photos/4691555/pexels-photo-4691555.jpeg?auto=compress&cs=tinysrgb&w=600',
      points: 30,
      duration: '2 ore'
    },
    {
      id: 2,
      title: 'Plimbare în parc',
      imageUrl: 'https://images.pexels.com/photos/1460880/pexels-photo-1460880.jpeg?auto=compress&cs=tinysrgb&w=600',
      points: 25,
      duration: '1 oră'
    },
    {
      id: 3,
      title: 'Gătit împreună',
      imageUrl: 'https://images.pexels.com/photos/4149015/pexels-photo-4149015.jpeg?auto=compress&cs=tinysrgb&w=600',
      points: 35,
      duration: '1.5 ore'
    },
    {
      id: 4,
      title: 'Film în familie',
      imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600',
      points: 20,
      duration: '2 ore'
    }
  ],
  completed: [
    {
      id: 1,
      title: 'Lectură zilnică',
      description: 'Cine citește cele mai multe pagini într-o săptămână?',
      winner: {
        name: 'Maria',
        imageUrl: 'https://images.pexels.com/photos/3771679/pexels-photo-3771679.jpeg?auto=compress&cs=tinysrgb&w=300',
        points: 50
      }
    },
    {
      id: 2,
      title: 'Provocarea curățeniei',
      description: 'Cea mai ordonată cameră timp de o săptămână',
      winner: {
        name: 'Andrei',
        imageUrl: 'https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=300',
        points: 40
      }
    }
  ]
};

export const mockBudgetData = {
  totalBalance: 3250,
  income: 4500,
  expenses: 1250,
  savings: 800,
  categories: [
    {
      name: 'Mâncare',
      icon: 'food',
      color: '#4CAF50',
      spent: 750,
      budget: 900
    },
    {
      name: 'Jucării',
      icon: 'games',
      color: '#FF6B6B',
      spent: 200,
      budget: 150
    },
    {
      name: 'Educație',
      icon: 'education',
      color: '#4F7CAC',
      spent: 300,
      budget: 400
    },
    {
      name: 'Casă',
      icon: 'home',
      color: '#FFB74D',
      spent: 650,
      budget: 800
    }
  ],
  transactions: [
    {
      id: 1,
      title: 'Salariu',
      amount: 4500,
      date: '3 Mai 2025',
      category: 'income',
      type: 'income'
    },
    {
      id: 2,
      title: 'Cumpărături Carrefour',
      amount: 350,
      date: '5 Mai 2025',
      category: 'food',
      type: 'expense'
    },
    {
      id: 3,
      title: 'Facturi utilități',
      amount: 450,
      date: '7 Mai 2025',
      category: 'bills',
      type: 'expense'
    },
    {
      id: 4,
      title: 'Jucărie nouă',
      amount: 150,
      date: '10 Mai 2025',
      category: 'shopping',
      type: 'expense'
    },
    {
      id: 5,
      title: 'Alocație copii',
      amount: 600,
      date: '15 Mai 2025',
      category: 'income',
      type: 'income'
    }
  ]
};

export const mockUserProfile = {
  name: 'Andrei Popescu',
  role: 'Copil',
  avatarUrl: 'https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=300',
  level: 5,
  totalPoints: 125,
  currentLevelPoints: 75,
  pointsToNextLevel: 150,
  achievements: [
    {
      id: 1,
      title: 'Ordonatul',
      color: '#4F7CAC'
    },
    {
      id: 2,
      title: 'Prietenul animalelor',
      color: '#91CDA8'
    },
    {
      id: 3,
      title: 'Ajutorul mamei',
      color: '#BDB2E5'
    },
    {
      id: 4,
      title: 'Cititorul',
      color: '#FFB74D'
    },
    {
      id: 5,
      title: 'Economistul',
      isLocked: true
    },
    {
      id: 6,
      title: 'Maestrul bucătar',
      isLocked: true
    }
  ],
  trophies: [
    {
      id: 1,
      title: 'Campionul sarcinilor',
      description: 'Ai completat 50 de sarcini',
      dateEarned: '15 Aprilie 2025'
    },
    {
      id: 2,
      title: 'Provocarea lecturii',
      description: 'Ai câștigat provocarea de citit 100 de pagini într-o săptămână',
      dateEarned: '2 Mai 2025'
    }
  ],
  availableRewards: [
    {
      id: 1,
      title: '+30 minute pe tabletă',
      description: 'Timp suplimentar de joc',
      pointsCost: 50
    },
    {
      id: 2,
      title: 'Alegerea filmului de familie',
      description: 'Tu decizi ce film veți viziona în seara de film',
      pointsCost: 75
    },
    {
      id: 3,
      title: 'Înghețată specială',
      description: 'O înghețată la alegere din gelateria preferată',
      pointsCost: 100
    },
    {
      id: 4,
      title: 'Jucărie nouă',
      description: 'O jucărie la alegere în limita a 150 lei',
      pointsCost: 200
    }
  ],
  redeemedRewards: [
    {
      id: 1,
      title: 'Pizza la cină',
      description: 'O cină specială cu pizza preferată',
      dateRedeemed: '25 Aprilie 2025'
    },
    {
      id: 2,
      title: 'Excursie la ZOO',
      description: 'O excursie de familie la grădina zoologică',
      dateRedeemed: '1 Mai 2025'
    }
  ]
};