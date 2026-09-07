import {
  ChurchEvent,
  Sermon,
  PrayerRequest,
  Testimonial,
  Attendee,
  Announcement,
  Pastor,
  Ministry,
  Song,
} from '../types';

export const DEFAULT_PASTORS: Pastor[] = [
  { id: '1', name: 'Zaldy Bernaldo', role: 'Pastor', facebook: 'https://www.facebook.com/zaldy.bernaldo.2025', image: 'Prayer Meeting/July21/july21-10.png' },
  { id: '2', name: 'Oliver Ricarpo', role: 'Associate Pastor', facebook: 'https://www.facebook.com/oliver.ricarpo', image: 'Prayer Meeting/July13/july13-3.png' },
  { id: '3', name: 'Jocelyn Ricarpo', role: 'Deacon', facebook: 'https://www.facebook.com/purokuno.stfrancis', image: 'Prayer Meeting/July6/july6-6.png' },
  { id: '4', name: 'Jericko Bernaldo', role: 'Guitarist', facebook: 'https://www.facebook.com/search/top?q=jericko%20bernaldo', image: '/leaders/pastor1.jpg' },
  { id: '5', name: 'Trixie Nacional', role: 'Bassist', facebook: 'https://www.facebook.com/trixie.nacional.5', image: '/leaders/pastor2.jpg' },
  { id: '6', name: 'Vianca Marie Hernandez', role: 'Worship Leader', facebook: 'https://www.facebook.com/profile.php?id=100086021530605', image: '/leaders/pastor3.jpg' },
  { id: '7', name: 'Trixie Mae Solano', role: 'Usherette', facebook: 'https://www.facebook.com/trixiemae.solano.56', image: '/leaders/pastor4.jpg' },
  { id: '8', name: 'Kirlly Pagara', role: 'Worship Leader', facebook: 'https://www.facebook.com/profile.php?id=61586061310680', image: '/leaders/pastor5.jpg' },
  { id: '9', name: 'Ramilyn Engracia', role: 'Announcer', facebook: 'https://www.facebook.com/ramramen.nissin', image: '/leaders/pastor6.jpg' },
  { id: '10', name: 'Ian Dela Cruz', role: 'Keyboardist', facebook: 'https://www.facebook.com/cmlvyannnn', image: '/leaders/pastor7.jpg' },
  { id: '11', name: 'Marvin Adlawan', role: 'Youth Leader', facebook: 'https://www.facebook.com/marvin.adlawan.48109', image: '/leaders/pastor8.jpg' },
  { id: '12', name: 'Reyman Boloso', role: 'Youth Leader', facebook: 'https://www.facebook.com/reyman.ireneaboloso', image: '/leaders/pastor13.jpg' },
  { id: '13', name: 'Reinz Baylon', role: 'Leader', facebook: 'https://www.facebook.com/reinz.baylon', image: '/leaders/pastor9.jpg' },
  { id: '14', name: 'Jeshurun Dy Ricarpo', role: 'Drummer', facebook: 'https://www.facebook.com/profile.php?id=61589678930945', image: '/leaders/pastor11.jpg' },
  { id: '15', name: 'Jedidiah Sy Ricarpo', role: 'Media', facebook: 'https://www.facebook.com/jedidiah.ricarpo', image: '/leaders/pastor12.jpg' }
];

export const DEFAULT_EVENTS: ChurchEvent[] = [
  {
    id: 'sunday',
    title: 'Sunday Service',
    date: 'Every Sunday • 8:30 AM',
    tag: '⛪ Worship',
    description: 'Our main weekly worship service. Join us for joyful praise, passionate prayer, and the faithful preaching of God\'s Word.',
    location: '📍 Gospel Fellowship Church, Limay, Bataan',
    defaultVerse: 'I was glad when they said to me, "Let us go into the house of the Lord."',
    defaultVerseRef: 'Psalm 122:1',
    image: '/Sunday Service/sunday-service.jpg',
    dateEntries: [
      {
        date: 'June 14',
        photos: [
          '/Sunday Service/June14/june14-1.jpg',
          '/Sunday Service/June14/june14-2.jpg',
          '/Sunday Service/June14/june14-3.jpg',
          '/Sunday Service/June14/june14-4.jpg',
          '/Sunday Service/June14/june14-5.jpg',
        ],
        verse: 'Pray without ceasing.',
        verseRef: '1 Thessalonians 5:17'
      },
      {
        date: 'June 21',
        photos: [
          '/Sunday Service/sunday-service.jpg',
          '/Sunday Service/sunday-service.jpg',
          '/Sunday Service/sunday-service.jpg',
          '/Sunday Service/sunday-service.jpg',
          '/Sunday Service/sunday-service.jpg',
        ],
        verse: 'Pray without ceasing.',
        verseRef: '1 Thessalonians 5:17'
      },
      {
        date: 'June 28',
        photos: [
          '/Sunday Service/sunday-service.jpg',
          '/Sunday Service/sunday-service.jpg',
          '/Sunday Service/sunday-service.jpg',
          '/Sunday Service/sunday-service.jpg',
          '/Sunday Service/sunday-service.jpg',
        ],
        verse: 'Pray without ceasing.',
        verseRef: '1 Thessalonians 5:17'
      },{
        date: 'July 5',
        photos: [
          '/Sunday Service/June14/june14-1.jpg',
          '/Sunday Service/June14/june14-2.jpg',
          '/Sunday Service/June14/june14-3.jpg',
          '/Sunday Service/June14/june14-4.jpg',
          '/Sunday Service/June14/june14-5.jpg',
        ],
        verse: 'Pray without ceasing.',
        verseRef: '1 Thessalonians 5:17'
      },
      {
        date: 'July 12',
        photos: [
        ],
      },
      {
        date: 'July 19',
        photos: [
        ],
      },
      {
        date: 'July 26',
        photos: [
        ],
      },
      {
        date: 'August 2',
        photos: [
        ],
      },
      {
        date: 'August 9',
        photos: [
        ],
      },
      {
        date: 'August 16',
        photos: [
        ],
      },
      {
        date: 'August 23',
        photos: [
        ],
      },
      {
        date: 'August 30',
        photos: [
        ],
      },
      {
        date: 'September 6',
        photos: [
        ],
      },
      {
        date: 'September 13',
        photos: [
        ],
      },
      {
        date: 'September 20',
        photos: [
        ],
      },
      {
        date: 'September 27',
        photos: [
        ],
      },
    ]
  },
  {
    id: 'worship',
    title: 'Worship Night',
    date: 'Every Friday • 7:00 PM',
    tag: '🎵 Music',
    description: 'A dedicated evening of intimate praise, prayer, and acoustic worship.',
    location: '📍 Gospel Fellowship Church Sanctuary',
    defaultVerse: 'Sing to the Lord a new song; sing to the Lord, all the earth.',
    defaultVerseRef: 'Psalm 96:1',
    image: '/Worship Night/worship-night.jpg',
    dateEntries: [
      {
        date: 'June 12',
        photos: [
          '/Worship Night/June12/june12-1.png',
          '/Worship Night/June12/june12-2.png',
          '/Worship Night/June12/june12-3.png',
          '/Worship Night/June12/june12-4.png',
          '/Worship Night/June12/june12-5.png',
          '/Worship Night/June12/june12-6.png',
          '/Worship Night/June12/june12-7.png',
          '/Worship Night/June12/june12-8.png',
          '/Worship Night/June12/june12-9.png',
        ],
      },
    ]
  },
  {
    id: 'prayer',
    title: 'Prayer Meeting',
    date: 'Every Monday • 7:00 PM',
    tag: '🙏 Prayer',
    description: 'Come together as a community to pray for our church, our nation, and one another.',
    location: '📍 Gospel Fellowship Church Sanctuary',
    defaultVerse: 'Pray without ceasing.',
    defaultVerseRef: 'Jeremiah 29:13',
    image: '/Prayer Meeting/prayer-meeting.jpg',
    dateEntries: [
      {
        date: 'June 8',
        photos: [
          '/Prayer Meeting/June8/june8-1.png',
          '/Prayer Meeting/June8/june8-2.png',
          '/Prayer Meeting/June8/june8-3.png',
          '/Prayer Meeting/June8/june8-4.png',
          '/Prayer Meeting/June8/june8-5.png',
          '/Prayer Meeting/June8/june8-6.png',
          '/Prayer Meeting/June8/june8-7.png',
          '/Prayer Meeting/June8/june8-8.png',
          '/Prayer Meeting/June8/june8-9.png',
          '/Prayer Meeting/June8/june8-10.png',
          '/Prayer Meeting/June8/june8-11.png',
          '/Prayer Meeting/June8/june8-12.png'
        ],
      },
      {
        date: 'June 15',
        photos: [
          '/Prayer Meeting/June15/june15-1.jpg',
          '/Prayer Meeting/June15/june15-2.jpg',
          '/Prayer Meeting/June15/june15-3.jpg',
          '/Prayer Meeting/June15/june15-4.jpg',
          '/Prayer Meeting/June15/june15-5.jpg',
          '/Prayer Meeting/June15/june15-6.jpg',
          '/Prayer Meeting/June15/june15-7.jpg',
          '/Prayer Meeting/June15/june15-8.jpg',
          '/Prayer Meeting/June15/june15-9.jpg',
          '/Prayer Meeting/June15/june15-10.jpg',
          '/Prayer Meeting/June15/june15-11.jpg',
          '/Prayer Meeting/June15/june15-12.jpg',
          '/Prayer Meeting/June15/june15-13.jpg',
        ],
      },
      {
        date: 'June 22',
        photos: [
          '/Prayer Meeting/June22/june22-1.png',
          '/Prayer Meeting/June22/june22-2.png',
          '/Prayer Meeting/June22/june22-3.png',
          '/Prayer Meeting/June22/june22-4.png',
          '/Prayer Meeting/June22/june22-5.png',
          '/Prayer Meeting/June22/june22-6.png',
          '/Prayer Meeting/June22/june22-7.png',
          '/Prayer Meeting/June22/june22-8.png',
          '/Prayer Meeting/June22/june22-9.png',
          '/Prayer Meeting/June22/june22-10.png',
          '/Prayer Meeting/June22/june22-11.png',
          '/Prayer Meeting/June22/june22-12.png',
          '/Prayer Meeting/June22/june22-13.png',
          '/Prayer Meeting/June22/june22-14.png',
          '/Prayer Meeting/June22/june22-15.png'
        ],
      },
      {
        date: 'June 29',
        photos: [
          '/Prayer Meeting/June29/june29-1.png',
          '/Prayer Meeting/June29/june29-2.png',
          '/Prayer Meeting/June29/june29-3.png',
          '/Prayer Meeting/June29/june29-4.png',
          '/Prayer Meeting/June29/june29-5.png'
        ],
      },
      {
        date: 'July 6',
        photos: [
          '/Prayer Meeting/July6/july6-1.png',
          '/Prayer Meeting/July6/july6-2.png',
          '/Prayer Meeting/July6/july6-3.png',
          '/Prayer Meeting/July6/july6-4.png',
          '/Prayer Meeting/July6/july6-5.png',
          '/Prayer Meeting/July6/july6-6.png',
          '/Prayer Meeting/July6/july6-7.png',
          '/Prayer Meeting/July6/july6-8.png',
          '/Prayer Meeting/July6/july6-9.png',
          '/Prayer Meeting/July6/july6-10.png',
          '/Prayer Meeting/July6/july6-11.png',
          '/Prayer Meeting/July6/july6-12.png',
          '/Prayer Meeting/July6/july6-13.png',
          '/Prayer Meeting/July6/july6-14.png',
          '/Prayer Meeting/July6/july6-15.png'
        ],
      },
      {
        date: 'July 13',
        photos: [
          '/Prayer Meeting/July13/july13-1.png',
          '/Prayer Meeting/July13/july13-2.png',
          '/Prayer Meeting/July13/july13-3.png',
          '/Prayer Meeting/July13/july13-4.png',
          '/Prayer Meeting/July13/july13-5.png',
          '/Prayer Meeting/July13/july13-6.png',
          '/Prayer Meeting/July13/july13-7.png',
          '/Prayer Meeting/July13/july13-8.png',
          '/Prayer Meeting/July13/july13-9.png',
          '/Prayer Meeting/July13/july13-10.png',
          '/Prayer Meeting/July13/july13-11.png',
          '/Prayer Meeting/July13/july13-12.png',
          '/Prayer Meeting/July13/july13-13.png',
          '/Prayer Meeting/July13/july13-14.png',
          '/Prayer Meeting/July13/july13-15.png'
        ],
      },
      {
        date: 'July 21',
        photos: [
          '/Prayer Meeting/July21/july21-1.png',
          '/Prayer Meeting/July21/july21-2.png',
          '/Prayer Meeting/July21/july21-3.png',
          '/Prayer Meeting/July21/july21-4.png',
          '/Prayer Meeting/July21/july21-5.png',
          '/Prayer Meeting/July21/july21-6.png',
          '/Prayer Meeting/July21/july21-7.png',
          '/Prayer Meeting/July21/july21-8.png',
          '/Prayer Meeting/July21/july21-9.png',
          '/Prayer Meeting/July21/july21-10.png',
          '/Prayer Meeting/July21/july21-11.png',
          '/Prayer Meeting/July21/july21-12.png',
        ],
      },
      {
        date: 'August 4',
        photos: [
          '/Prayer Meeting/August4/august4-1.png',
          '/Prayer Meeting/August4/august4-2.png',
          '/Prayer Meeting/August4/august4-3.png',
          '/Prayer Meeting/August4/august4-4.png',
          '/Prayer Meeting/August4/august4-5.png',
          '/Prayer Meeting/August4/august4-6.png',
          '/Prayer Meeting/August4/august4-7.png',
          '/Prayer Meeting/August4/august4-8.png',
          '/Prayer Meeting/August4/august4-9.png',
          '/Prayer Meeting/August4/august4-10.png',
          '/Prayer Meeting/August4/august4-11.png',
          '/Prayer Meeting/August4/august4-12.png',
          '/Prayer Meeting/August4/august4-13.png',
          '/Prayer Meeting/August4/august4-14.png',
          '/Prayer Meeting/August4/august4-15.png'
        ],
      },
      {
        date: 'August 11',
        photos: [
          '/Prayer Meeting/August11/august11-1.png',
          '/Prayer Meeting/August11/august11-2.png',
          '/Prayer Meeting/August11/august11-3.png',
          '/Prayer Meeting/August11/august11-4.png',
          '/Prayer Meeting/August11/august11-5.png',
          '/Prayer Meeting/August11/august11-6.png',
          '/Prayer Meeting/August11/august11-7.png',
          '/Prayer Meeting/August11/august11-8.png',
          '/Prayer Meeting/August11/august11-9.png',
          '/Prayer Meeting/August11/august11-10.png',
          '/Prayer Meeting/August11/august11-11.png',
          '/Prayer Meeting/August11/august11-12.png',
          '/Prayer Meeting/August11/august11-13.png',
          '/Prayer Meeting/August11/august11-14.png',
          '/Prayer Meeting/August11/august11-15.png'
        ],
      },
      {
        date: 'August 18',
        photos: [
        ],
      },
      {
        date: 'August 25',
        photos: [
        ],
      },
      {
        date: 'September 1',
        photos: [
        ],
      },
      {
        date: 'September 8',
        photos: [
        ],
      },
      {
        date: 'September 15',
        photos: [
        ],
      },
    ]
  },
  {
    id: 'biblestudy',
    title: 'Bible Study',
    date: 'Every Wednesday • 7:00 PM',
    tag: '📖 Word',
    description: 'Interactive mid-week study diving deep into the scriptures and practical Christian living.',
    location: '📍 Gospel Fellowship Church',
    defaultVerse: 'Your word is a lamp to my feet and a light to my path.',
    defaultVerseRef: 'Psalm 119:105',
    image: '/Bible Study/bible-study.jpg',
    dateEntries: [
      {
        date: 'June 10',
        photos: [
          '/Bible Study/June10/june10-1.png',
          '/Bible Study/June10/june10-2.png',
          '/Bible Study/June10/june10-3.png',
          '/Bible Study/June10/june10-4.png',
          '/Bible Study/June10/june10-5.png',
          '/Bible Study/June10/june10-6.png',
          '/Bible Study/June10/june10-7.png',
          '/Bible Study/June10/june10-8.png',
          '/Bible Study/June10/june10-9.png',
          '/Bible Study/June10/june10-10.png',
          '/Bible Study/June10/june10-11.png',
          '/Bible Study/June10/june10-12.png',
          '/Bible Study/June10/june10-13.png',
          '/Bible Study/June10/june10-14.png',
          '/Bible Study/June10/june10-15.png',
          '/Bible Study/June10/june10-16.png',
          '/Bible Study/June10/june10-17.png',
          '/Bible Study/June10/june10-18.png',
          '/Bible Study/June10/june10-19.png',
          '/Bible Study/June10/june10-20.png',
          '/Bible Study/June10/june10-21.png',
          '/Bible Study/June10/june10-22.png',
        ],
      },
      {
        date: 'June 17',
        photos: [
          '/Bible Study/June17/june17-1.png',
          '/Bible Study/June17/june17-2.png',
          '/Bible Study/June17/june17-3.png',
          '/Bible Study/June17/june17-4.png',
          '/Bible Study/June17/june17-5.png',
          '/Bible Study/June17/june17-6.png',
          '/Bible Study/June17/june17-7.png',
          '/Bible Study/June17/june17-8.png',
          '/Bible Study/June17/june17-9.png',
          '/Bible Study/June17/june17-10.png',
        ],
      },
      {
        date: 'June 24',
        photos: [
          '/Bible Study/June24/june24-1.png',
          '/Bible Study/June24/june24-2.png',
          '/Bible Study/June24/june24-3.png',
          '/Bible Study/June24/june24-4.png',
          '/Bible Study/June24/june24-5.png',
        ],
      },
      {
        date: 'July 1',
        photos: [
          '/Bible Study/July1/july1-1.png',
        ],
      },
      {
        date: 'July 8',
        photos: [
          '/Bible Study/July8/july8-1.png',
          '/Bible Study/July8/july8-2.png',
          '/Bible Study/July8/july8-3.png',
          '/Bible Study/July8/july8-4.png',
          '/Bible Study/July8/july8-5.png',
          '/Bible Study/July8/july8-6.png',
          '/Bible Study/July8/july8-7.png',
          '/Bible Study/July8/july8-8.png',
          '/Bible Study/July8/july8-9.png',
          '/Bible Study/July8/july8-10.png',
          '/Bible Study/July8/july8-11.png',
          '/Bible Study/July8/july8-12.png',
          '/Bible Study/July8/july8-13.png',
        ],
      },
      {
        date: 'July 16',
        photos: [
          '/Bible Study/July16/july16-1.png',
          '/Bible Study/July16/july16-2.png',
          '/Bible Study/July16/july16-3.png',
          '/Bible Study/July16/july16-4.png',
          '/Bible Study/July16/july16-5.png',
          '/Bible Study/July16/july16-6.png',
        ],
      },
      {
        date: 'July 23',
        photos: [
          '/Bible Study/July23/july23-1.png',
          '/Bible Study/July23/july23-2.png',
          '/Bible Study/July23/july23-3.png',
          '/Bible Study/July23/july23-4.png',
          '/Bible Study/July23/july23-5.png',
        ],
      },
      {
        date: 'July 30',
        photos: [
          '/Bible Study/July30/july30-1.png',
          '/Bible Study/July30/july30-2.png',
          '/Bible Study/July30/july30-3.png',
          '/Bible Study/July30/july30-4.png',
          '/Bible Study/July30/july30-5.png',
          '/Bible Study/July30/july30-22.png',
        ],
      },
      {
        date: 'August 6',
        photos: [
          '/Bible Study/August6/august6-1.png',
          '/Bible Study/August6/august6-2.png',
          '/Bible Study/August6/august6-21.png',
          '/Bible Study/August6/august6-22.png',
        ],
      },
      {
        date: 'August 13',
        photos: [
          '/Bible Study/August13/august13-1.png',
          '/Bible Study/August13/august13-2.png',
        ],
      },
    ]
  },
  {
    id: 'youth',
    title: 'Next Generation Youth',
    date: 'Every Sunday • 7:00 PM',
    tag: '🌟 Youth',
    description: 'Fellowship, games, worship, and Bible discussions tailored specifically for students and young adults.',
    location: '📍 Gospel Fellowship Church Youth Hall',
    defaultVerse: 'Let no one despise your youth, but set the believers an example.',
    defaultVerseRef: '1 Timothy 4:12',
    image: '/Next Gen/next-gen.jpg',
    dateEntries: []
  },
  {
    id: 'anniversary',
    title: 'Church Anniversary Celebration',
    date: 'Every 2nd Sunday of the month',
    tag: '🎉 Celebration',
    description: 'Special thanksgiving gathering celebrating God\'s faithfulness and guidance in our church history.',
    location: '📍 Gospel Fellowship Church Main Sanctuary',
    defaultVerse: 'I will bless the Lord at all times; His praise shall continually be in my mouth.',
    defaultVerseRef: 'Psalm 34:1',
    image: '/Anniversary/3rd Year.jpg',
    dateEntries: [
      {
        date: '1st Year Anniversary',
        photos: [
          '/Anniversary/1st-year-1.jpg',
          '/Anniversary/1st-year-2.jpg'
        ],
        verse: 'I will bless the Lord at all times; His praise shall continually be in my mouth.',
        verseRef: 'Psalm 34:1'
      },
      {
        date: '2nd Year Anniversary',
        photos: [
          '/Anniversary/2nd-year-1.jpg',
          '/Anniversary/2nd-year-2.jpg'
        ],
        verse: 'The Lord has done great things for us, and we are filled with joy.',
        verseRef: 'Psalm 126:3'
      },
      {
        date: '3rd Year Anniversary',
        photos: [
          '/Anniversary/3rd Year.jpg',
          '/Anniversary/3rd-year-2.jpg',
          '/Anniversary/3rd-year-3.jpg'
        ],
        verse: 'Being confident of this, that he who began a good work in you will carry it on to completion.',
        verseRef: 'Philippians 1:6'
      }
    ]
  }
];

export const DEFAULT_SERMONS: Sermon[] = [
  {
    id: '1',
    title: 'Obedience Over Sacrifice',
    sermonDate: 'July 12, 2026',
    speaker: 'Pastor Zaldy Bernaldo',
    verse: 'To obey is better than sacrifice, and to heed is better than the fat of rams.',
    verseRef: '1 Samuel 15:22',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    audioDuration: '32:15',
    image: 'https://images.unsplash.com/photo-1510563800743-aed236490d08?auto=format&fit=crop&w=800&q=80',
    description: 'An inspiring message on understanding true obedience to God\'s commands and how it brings real blessing to our daily lives.'
  },
  {
    id: '2',
    title: 'A New Song of Praise',
    sermonDate: 'July 17, 2026',
    speaker: 'Associate Pastor Oliver Ricarpo',
    verse: 'Sing to the Lord a new song; sing to the Lord, all the earth.',
    verseRef: 'Psalm 96:1',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    audioDuration: '28:40',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    description: 'Discovering how genuine worship transforms our attitude and fills our hearts with fresh joy even during challenging times.'
  },
  {
    id: '3',
    title: 'Light to My Path',
    sermonDate: 'July 16, 2026',
    speaker: 'Pastor Zaldy Bernaldo',
    verse: 'Your word is a lamp to my feet and a light to my path.',
    verseRef: 'Psalm 119:105',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    audioDuration: '35:10',
    image: 'https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?auto=format&fit=crop&w=800&q=80',
    description: 'How reading and applying Scripture gives clear direction for life choices, family relationships, and personal peace.'
  },
  {
    id: '4',
    title: 'Faith That Moves Mountains',
    sermonDate: 'July 23, 2026',
    speaker: 'Deacon Jocelyn Ricarpo',
    verse: 'If you have faith as small as a mustard seed, nothing will be impossible for you.',
    verseRef: 'Matthew 17:20',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    audioDuration: '30:00',
    image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80',
    description: 'Encouraging message on trusting God during difficult trials and believing in His almighty power.'
  }
];

export const DEFAULT_PRAYERS: PrayerRequest[] = [
  { id: '1', name: 'Maria Santos', contact: '0917-123-4567', request: 'Ipapanalangin ko po ang kalusugan at proteksyon ng aming pamilya ngayong buwan.', createdAt: '2026-08-01', status: 'approved', category: 'Health & Protection' },
  { id: '2', name: 'Juan Dela Cruz', contact: '0912-345-6789', request: 'Gabay ng Panginoon para sa pag-aaral ng aking mga anak at sa aming trabaho.', createdAt: '2026-07-30', status: 'approved', category: 'Family & Guidance' },
  { id: '3', name: 'Anonymous Member', request: 'Gumaling po sana ang aking lola na kasalukuyang nasa ospital.', createdAt: '2026-07-28', status: 'approved', category: 'Healing' },
  { id: '4', name: 'Luzviminda Reyes', contact: '0922-987-6543', request: 'Kapayapaan at pagkakaisa para sa aming pamayanan at sa buong simbahan.', createdAt: '2026-07-25', status: 'approved', category: 'Peace & Community' }
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Brother Mark', role: 'Member since 2023', text: 'Napakalaking tulong ng Gospel Fellowship Church sa aming pamilya. Dito namin natutunan ang tunay na pagmamahal at pananampalataya kay Hesus.', createdAt: '2026-07-10' },
  { id: '2', name: 'Sister Elena', role: 'Youth Parent', text: 'Ang mga kabataan sa aming tahanan ay nagbago ang pananaw sa buhay simula nang sumali sila sa Next Gen Youth fellowship.', createdAt: '2026-07-15' }
];

export const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  { id: '1', title: 'Water Baptismal Service', details: 'July 21, 2026 • 8:30 AM at Limay Beach. Open for candidates.', date: 'July 21, 2026' },
  { id: '2', title: 'Annual Church Thanksgiving', details: 'August 2, 2026 • Join us for a special celebration meal after Prayer Meeting.', date: 'August 2, 2026' },
  { id: '3', title: 'Youth Summer Camp 2026', details: 'August 15-17, 2026 • Registration is now open! Contact Marvin Adlawan.', date: 'August 15, 2026' }
];

export const DEFAULT_ATTENDEES: Attendee[] = [
  { id: '1', name: 'Juan Dela Cruz', facebookName: 'Juan Dela Cruz', contact: '0912-345-6789', age: '28', registeredAt: '2026-08-01' },
  { id: '2', name: 'Maria Santos', facebookName: 'Maria S.', contact: '0917-123-4567', age: '34', registeredAt: '2026-08-02' },
  { id: '3', name: 'Pedro Ramos', facebookName: 'Pedro Ramos', contact: '0998-765-4321', age: '45', registeredAt: '2026-08-03' },
  { id: '4', name: 'Luzviminda Reyes', facebookName: 'Luz Reyes', contact: '0922-987-6543', age: '62', registeredAt: '2026-08-04' }
];

export const DEFAULT_SONGS: Song[] = [
  { name: 'Way Maker', link: 'https://www.youtube.com/watch?v=iJCV_2H9xD0' },
  { name: 'Goodness of God', link: 'https://www.youtube.com/watch?v=-f4MUUMHh4g' },
  { name: 'What a Beautiful Name', link: 'https://www.youtube.com/watch?v=nQWFzMvCfLE' },
  { name: '10,000 Reasons (Bless the Lord)', link: 'https://www.youtube.com/watch?v=DXDGE_lRI0E' },
  { name: 'Here I Am to Worship', link: 'https://www.youtube.com/watch?v=68E6sK6dDyg' }
];

export const DEFAULT_MINISTRIES: Ministry[] = [
  {
    id: 'worship',
    icon: 'bx bx-music',
    title: 'Worship Ministry',
    description: 'Leading the congregation in spirit-filled, heartfelt worship through music.',
    leader: 'Vianca Hernandez / Kirlly Pagara',
    meetingTime: 'Every Saturday • 9:00 AM',
    location: 'Main Sanctuary',
    details: [
      '🎵 Prepare worship setlist',
      '🎵 Practice every Saturday',
      '🎵 Coordinate with musicians',
      '🎵 Lead Sunday worship'
    ]
  },
  {
    id: 'prayer',
    icon: 'bx bx-heart',
    title: 'Prayer Ministry',
    description: 'Interceding faithfully for the church, families, community, and nation.',
    leader: 'Jocelyn Ricarpo',
    meetingTime: 'Monday • 7:00 PM',
    location: 'Prayer Room',
    details: [
      '🕯️ Church growth & protection',
      '🕯️ Community outreach',
      '🕯️ Healing of the sick',
      '🕯️ Youth & children'
    ]
  },
  {
    id: 'youth',
    icon: 'bx bx-fire',
    title: 'Next Generation Youth',
    description: 'Fellowship, games, worship, and Bible discussions tailored for students and young adults.',
    leader: 'Marvin Adlawan / Reinz Baylon',
    meetingTime: 'Sunday • 7:00 PM',
    location: 'Youth Hall',
    details: [
      '🌟 Bible Study',
      '🌟 Music & Worship',
      '🌟 Outreach Programs',
      '🌟 Sports & Fellowship'
    ]
  },
  {
    id: 'ushering',
    icon: 'bx bx-hands',
    title: 'Ushering & Hospitality Ministry',
    description: 'Welcoming everyone with warm smiles, guiding attendees, and serving with joy.',
    leader: 'Trixie Mae Solano',
    meetingTime: 'Sunday • 7:30 AM',
    location: 'Church Entrance',
    details: [
      '🤝 Greeting attendees',
      '🤝 Assisting visitors',
      '🤝 Offering collection',
      '🤝 Maintaining order'
    ]
  },
  {
    id: 'media',
    icon: 'bx bx-video',
    title: 'Media & Technology Ministry',
    description: 'Spreading the Gospel through audio visual technology, photography, and online streaming.',
    leader: 'Jedidiah Sy Ricarpo',
    meetingTime: 'Saturday • 2:00 PM',
    location: 'Technical Booth',
    details: [
      '📹 Sound System',
      '📹 Projection & Slides',
      '📹 Live Streaming',
      '📹 Photography & Video'
    ]
  },
  {
    id: 'children',
    icon: 'bx bx-child',
    title: "Children's Ministry",
    description: 'Nurturing faith in our little ones with love, care, and fun Bible activities.',
    leader: 'Jocelyn Ricarpo',
    meetingTime: 'Sunday • 9:30 AM',
    location: 'Children\'s Room',
    details: [
      '📖 Bible Stories',
      '🎨 Arts & Crafts',
      '🎵 Singing & Worship',
      '📝 Memory Verses'
    ]
  }
];