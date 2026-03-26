// Movie Database with full details
const moviesDatabase = {
    'death-whisperer-2': {
        id: 'death-whisperer-2',
        titleThai: 'ธี่หยด 2',
        titleEng: 'Death Whisperer 2',
        genres: ['สยองขวัญ', 'Thriller'],
        duration: '2 ชม. 5 นาที',
        rating: '4.8',
        reviews: '12.5k',
        releaseDate: '24 Oct 2024',
        ageLimit: '15+',
        backdropImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASMj5eZTFJZJs9CywraW3SS7EjRRxBBEHqp-Y19NWauJrymZaNn1rXaEBcJQPTmnFDhF7-p6IIwNd7AQa6xtFWoImsrofyxVANdSPqev0LFMGsYGtKLktvAmYxrQAh7SAmvSUcuhxed8VZqLbtnuVBw9ocFdQcmk0jMeZlAJDbIk3YjSTlLfLNvQWmrF_OisbgJslncTjKUzc3oTfExAOGztOdWazgvwZYKGiLfTAsGiHOAPFMZ5QUH',
        trailerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyWgC4UyWziyzpvGycmmrFcXTSS5aq4jSUnwBdTIjLplvd3mUe3Fi0fnEEH7FPiW53M7IPURk4T5B1Pz8y3Hrb-HzQnIXXjPPPDH0O_OiPjIi3-MLddIU-KFHdQmU',
        description: 'สลับปลิสิตจากการรายของแม่ ยักษ์ยดงคนอสำหมดสำหรับชีวิตส่วนของเรือศวนองเหยือจงไปสล่างไม่ลดสล่าง แม่',
        showtimes: [
            {
                cinema: 'Paragon Cineplex',
                distance: '1.2 km away',
                amenities: ['Parking', 'Food'],
                systems: [
                    {
                        format: 'IMAX',
                        type: 'Laser 2D • Thai Audio / Eng Sub',
                        times: [
                            { time: '10:30', hall: 'Hall 1' },
                            { time: '13:45', hall: 'Hall 1' },
                            { time: '17:00', hall: 'Hall 1' },
                            { time: '20:15', hall: 'Hall 1' }
                        ]
                    },
                    {
                        format: 'Digital 2D',
                        type: 'Thai Audio',
                        times: [
                            { time: '11:00', hall: 'Hall 4' },
                            { time: '14:20', hall: 'Hall 4' },
                            { time: '16:40', hall: 'Hall 6' },
                            { time: '19:00', hall: 'Hall 4' },
                            { time: '22:00', hall: 'Hall 4' }
                        ]
                    }
                ]
            },
            {
                cinema: 'Major Cineplex Sukhumvit',
                distance: '3.5 km away',
                amenities: ['Parking', 'Food', 'WiFi'],
                systems: [
                    {
                        format: 'VIP Class',
                        type: 'Thai Audio / Eng Sub',
                        times: [
                            { time: '12:00', hall: 'Theater 1' },
                            { time: '15:30', hall: 'Theater 1' }
                        ]
                    }
                ]
            }
        ],
        cast: [
            {
                name: 'Nadech Kugimiya',
                role: 'Yak',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDztgQDczUzIVc52GWs63FgACO2p6azHhcIW5dgB8qmysQM6j5-rFtRm_pfg7nZ9fTKWyRz-XXKkJabGtW3Ua0'
            },
            {
                name: 'Denise Jelilcha',
                role: 'Yad',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkIsD3s0rk3_ewVSn0FhMjYhkExgvxlS6KNKZ_ZwEzd6zbZAwbGoKAuYaPHFkivNdS2VcbvJfaRvmzTIFQaENDjuqT3WFcgH-IGwmgcj8TSrh16'
            },
            {
                name: 'Rattanawadee',
                role: 'Yam',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoSYkuFWmECjUd6tfhu4buOztBX16Cp8AtlE789NKwUcGcF-b7UQudeAYmSQ0vKB6xNajHDEmQMKgEfaPt1X-_BH_JDFAksrN44BfISI0Ie9h3naMCoFqwz0'
            }
        ]
    },
    'the-marvels': {
        id: 'the-marvels',
        titleThai: 'The Marvels',
        titleEng: 'The Marvels',
        genres: ['แอ็คชัน', 'Adventure'],
        duration: '1 ชม. 45 นาที',
        rating: '7.5',
        reviews: '8.2k',
        releaseDate: '20 Oct 2024',
        ageLimit: 'G',
        backdropImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4LF9j0wT5oJ1xXpQ2z9KqL3m4MdN7p2s8t0r5vW6a7bXyZ0cDeFgHiJkL1mNoPqRsT',
        trailerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4LF9j0wT5oJ1xXpQ2z9KqL3m4MdN7p2s8t0r5',
        description: 'นักสู้ซูเปอร์ฮีโร่ทั้งสามจัดการกับศัตรูที่ยากจะต่อต้าน พวกเขาต้องทำงานร่วมกันเพื่อปกป้องโลก',
        showtimes: [
            {
                cinema: 'Icon Siam Cineplex',
                distance: '2.1 km away',
                amenities: ['Parking', 'Food'],
                systems: [
                    {
                        format: 'IMAX',
                        type: 'Laser 2D • Thai Audio / Eng Sub',
                        times: [
                            { time: '11:00', hall: 'Hall 2' },
                            { time: '14:00', hall: 'Hall 2' },
                            { time: '17:30', hall: 'Hall 2' },
                            { time: '20:00', hall: 'Hall 2' }
                        ]
                    },
                    {
                        format: '4DX',
                        type: 'Thai Audio / Eng Sub',
                        times: [
                            { time: '12:30', hall: 'Hall 5' },
                            { time: '15:45', hall: 'Hall 5' },
                            { time: '18:15', hall: 'Hall 5' },
                            { time: '21:00', hall: 'Hall 5' }
                        ]
                    }
                ]
            },
            {
                cinema: 'Major Cineplex Ratchayothin',
                distance: '4.2 km away',
                amenities: ['Parking', 'Food', 'WiFi'],
                systems: [
                    {
                        format: 'Standard 2D',
                        type: 'Thai Audio',
                        times: [
                            { time: '13:00', hall: 'Hall 3' },
                            { time: '16:00', hall: 'Hall 3' },
                            { time: '19:00', hall: 'Hall 3' }
                        ]
                    }
                ]
            }
        ],
        cast: [
            {
                name: 'Brie Larson',
                role: 'Captain Marvel',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0brie1Larson0Captain0Marvel'
            },
            {
                name: 'Teyonah Parris',
                role: 'Monica Rambeau',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT3yonah0Parris0Monica0Rambeau'
            },
            {
                name: 'Iman Vellani',
                role: 'Kamala Khan',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI0man0Vellani0Kamala0Khan'
            },
            {
                name: 'Samuel L. Jackson',
                role: 'Nick Fury',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS0amuel0L0Jackson0Nick0Fury'
            }
        ]
    },
    'hunger-games': {
        id: 'hunger-games',
        titleThai: 'Hunger Games',
        titleEng: 'The Hunger Games',
        genres: ['แอ็คชัน', 'ดราม่า'],
        duration: '2 ชม. 38 นาที',
        rating: '8.8',
        reviews: '15.3k',
        releaseDate: '18 Oct 2024',
        ageLimit: '13+',
        backdropImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7hunger0Games0backdrop00',
        trailerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7hunger0Games0trailer00',
        description: 'เกมการต่อสู้ที่ดุร้ายที่สำหรับเด็กควายศีลเข่างเข่างด้านการต่อสู้เพื่อความอยู่รอดของตัวเอง',
        showtimes: [
            {
                cinema: 'Paragon Cineplex',
                distance: '1.2 km away',
                amenities: ['Parking', 'Food'],
                systems: [
                    {
                        format: '4DX',
                        type: 'Thai Audio / Eng Sub',
                        times: [
                            { time: '10:00', hall: 'Hall 3' },
                            { time: '13:00', hall: 'Hall 3' },
                            { time: '16:30', hall: 'Hall 3' },
                            { time: '19:30', hall: 'Hall 3' }
                        ]
                    },
                    {
                        format: 'Standard 2D',
                        type: 'Thai Audio',
                        times: [
                            { time: '11:30', hall: 'Hall 7' },
                            { time: '14:45', hall: 'Hall 7' },
                            { time: '18:00', hall: 'Hall 7' },
                            { time: '21:15', hall: 'Hall 7' }
                        ]
                    }
                ]
            }
        ],
        cast: [
            {
                name: 'Jennifer Lawrence',
                role: 'Katniss Everdeen',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ0ennifer0Lawrence0Katniss'
            },
            {
                name: 'Josh Hutcherson',
                role: 'Peeta Mellark',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ0osh0Hutcherson0Peeta'
            },
            {
                name: 'Liam Hemsworth',
                role: 'Gale Hawthorne',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL0iam0Hemsworth0Gale'
            },
            {
                name: 'Woody Harrelson',
                role: 'Haymitch Abernathy',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW0oody0Harrelson0Haymitch'
            }
        ]
    },
    'killers-of-the-flower-moon': {
        id: 'killers-of-the-flower-moon',
        titleThai: 'Killers of the Flower Moon',
        titleEng: 'Killers of the Flower Moon',
        genres: ['ดราม่า', 'Crime'],
        duration: '3 ชม. 26 นาที',
        rating: '9.0',
        reviews: '18.7k',
        releaseDate: '22 Oct 2024',
        ageLimit: '18+',
        backdropImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5LDqEhChXP-vKH3QfaFy2-3NiwsDGow2GuUO3vq5mAbu9JUt7',
        trailerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5LDq0Killers0Flower0Moon0',
        description: 'ภาพยนตร์มาตรฐานที่บรรยายปัญหาความลึกของการหลอก และการลักษณ์พิษของตลาดไข่มุกในเวลาสงครามสมัยโจ้ย',
        showtimes: [
            {
                cinema: 'Major Cineplex Sukhumvit',
                distance: '3.5 km away',
                amenities: ['Parking', 'Food', 'WiFi'],
                systems: [
                    {
                        format: 'Standard 2D',
                        type: 'Eng Sub',
                        times: [
                            { time: '10:30', hall: 'Theater 4' },
                            { time: '13:45', hall: 'Theater 4' },
                            { time: '17:15', hall: 'Theater 4' },
                            { time: '20:30', hall: 'Theater 4' }
                        ]
                    }
                ]
            }
        ],
        cast: [
            {
                name: 'Leonardo DiCaprio',
                role: 'Ernest Burkhart',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL0eonardo0DiCaprio0Ernest'
            },
            {
                name: 'Robert De Niro',
                role: 'William K. Hale',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR0obert0De0Niro0William'
            },
            {
                name: 'Lily Gladstone',
                role: 'Mollie Kyle',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL0ily0Gladstone0Mollie'
            }
        ]
    },
    'trolls-band-together': {
        id: 'trolls-band-together',
        titleThai: 'Trolls Band Together',
        titleEng: 'Trolls Band Together',
        genres: ['แอนิเมชัน', 'Comedy'],
        duration: '1 ชม. 32 นาที',
        rating: '7.0',
        reviews: '9.5k',
        releaseDate: '15 Oct 2024',
        ageLimit: 'G',
        backdropImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAERj7xQVsl0tyNLugPr8wpKU9VHDPlA6FU',
        trailerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAERj7xQVsl0tyNLugPr8wpKU9VHDPlA6FU',
        description: 'เอลฟ์สวนวิเศษภาพเรื่องน้อยน้อยเพลง และมิตรภาพหลังจากไผ่ทั่วนอกอความระบบ',
        showtimes: [
            {
                cinema: 'Icon Siam Cineplex',
                distance: '2.1 km away',
                amenities: ['Parking', 'Food'],
                systems: [
                    {
                        format: 'Standard 2D',
                        type: 'Thai Audio',
                        times: [
                            { time: '09:30', hall: 'Hall 1' },
                            { time: '11:45', hall: 'Hall 1' },
                            { time: '14:00', hall: 'Hall 1' },
                            { time: '16:15', hall: 'Hall 1' },
                            { time: '18:30', hall: 'Hall 1' }
                        ]
                    }
                ]
            },
            {
                cinema: 'Major Cineplex Ratchayothin',
                distance: '4.2 km away',
                amenities: ['Parking', 'Food', 'WiFi'],
                systems: [
                    {
                        format: 'Standard 2D',
                        type: 'Thai Audio',
                        times: [
                            { time: '10:00', hall: 'Theater 2' },
                            { time: '12:30', hall: 'Theater 2' },
                            { time: '15:00', hall: 'Theater 2' },
                            { time: '17:30', hall: 'Theater 2' },
                            { time: '20:00', hall: 'Theater 2' }
                        ]
                    }
                ]
            }
        ],
        cast: [
            {
                name: 'Justin Timberlake',
                role: 'Branch',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ0ustin0Timberlake0Branch'
            },
            {
                name: 'Anna Kendrick',
                role: 'Poppy',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA0nna0Kendrick0Poppy'
            },
            {
                name: 'Zooey Deschanel',
                role: 'Delta Dawn',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ0ooey0Deschanel0Delta'
            }
        ]
    }
};

const additionalMovies = {
    'dune-part-two': {
        id: 'dune-part-two',
        titleThai: 'ดูน ภาค 2',
        titleEng: 'Dune: Part Two',
        genres: ['ไซไฟ', 'ผจญภัย'],
        duration: '2 ชม. 46 นาที',
        rating: '8.7',
        reviews: '21.4k',
        releaseDate: '29 Feb 2024',
        ageLimit: '13+',
        backdropImage: 'https://picsum.photos/seed/dune-part-two-bg/1600/900',
        trailerImage: 'https://picsum.photos/seed/dune-part-two-trailer/1280/720',
        description: 'พอล อะเทรดีสรวมพลังกับชาวฟรีเมนเพื่อเผชิญศึกครั้งใหญ่และเปลี่ยนชะตาแห่งอาราคิส',
        showtimes: [{
            cinema: 'Paragon Cineplex',
            distance: '1.2 km away',
            amenities: ['Parking', 'Food', 'WiFi'],
            systems: [{
                format: 'IMAX',
                type: 'TH/EN SUB',
                times: [{ time: '10:20', hall: 'Hall 2' }, { time: '14:10', hall: 'Hall 2' }, { time: '19:00', hall: 'Hall 2' }]
            }]
        }],
        cast: [
            { name: 'Timothée Chalamet', role: 'Paul Atreides', image: 'https://i.pravatar.cc/200?img=11' },
            { name: 'Zendaya', role: 'Chani', image: 'https://i.pravatar.cc/200?img=12' },
            { name: 'Rebecca Ferguson', role: 'Lady Jessica', image: 'https://i.pravatar.cc/200?img=13' }
        ]
    },
    'inside-out-2': {
        id: 'inside-out-2',
        titleThai: 'มหัศจรรย์อารมณ์อลเวง 2',
        titleEng: 'Inside Out 2',
        genres: ['แอนิเมชัน', 'ครอบครัว'],
        duration: '1 ชม. 36 นาที',
        rating: '8.3',
        reviews: '18.9k',
        releaseDate: '14 Jun 2024',
        ageLimit: 'G',
        backdropImage: 'https://picsum.photos/seed/inside-out-2-bg/1600/900',
        trailerImage: 'https://picsum.photos/seed/inside-out-2-trailer/1280/720',
        description: 'ไรลีย์เข้าสู่วัยรุ่นพร้อมอารมณ์ใหม่ที่เข้ามาปั่นป่วนการควบคุมในใจของเธอ',
        showtimes: [{
            cinema: 'Icon Siam Cineplex',
            distance: '2.1 km away',
            amenities: ['Parking', 'Food'],
            systems: [{
                format: 'Digital 2D',
                type: 'Thai Dub / EN SUB',
                times: [{ time: '11:00', hall: 'Hall 1' }, { time: '13:20', hall: 'Hall 1' }, { time: '16:10', hall: 'Hall 1' }]
            }]
        }],
        cast: [
            { name: 'Amy Poehler', role: 'Joy', image: 'https://i.pravatar.cc/200?img=21' },
            { name: 'Maya Hawke', role: 'Anxiety', image: 'https://i.pravatar.cc/200?img=22' },
            { name: 'Phyllis Smith', role: 'Sadness', image: 'https://i.pravatar.cc/200?img=23' }
        ]
    },
    'kung-fu-panda-4': {
        id: 'kung-fu-panda-4',
        titleThai: 'กังฟูแพนด้า 4',
        titleEng: 'Kung Fu Panda 4',
        genres: ['แอนิเมชัน', 'แอ็คชัน'],
        duration: '1 ชม. 34 นาที',
        rating: '7.9',
        reviews: '11.1k',
        releaseDate: '8 Mar 2024',
        ageLimit: 'G',
        backdropImage: 'https://picsum.photos/seed/kfp4-bg/1600/900',
        trailerImage: 'https://picsum.photos/seed/kfp4-trailer/1280/720',
        description: 'โปต้องสอนทายาทนักรบมังกรคนใหม่ พร้อมเผชิญภัยจากวายร้ายผู้เปลี่ยนร่าง',
        showtimes: [{
            cinema: 'Major Cineplex Ratchayothin',
            distance: '4.2 km away',
            amenities: ['Parking', 'Food', 'WiFi'],
            systems: [{
                format: 'Digital 2D',
                type: 'Thai Dub',
                times: [{ time: '10:40', hall: 'Hall 6' }, { time: '13:00', hall: 'Hall 6' }, { time: '15:30', hall: 'Hall 6' }]
            }]
        }],
        cast: [
            { name: 'Jack Black', role: 'Po', image: 'https://i.pravatar.cc/200?img=31' },
            { name: 'Awkwafina', role: 'Zhen', image: 'https://i.pravatar.cc/200?img=32' },
            { name: 'Viola Davis', role: 'The Chameleon', image: 'https://i.pravatar.cc/200?img=33' }
        ]
    },
    'godzilla-x-kong': {
        id: 'godzilla-x-kong',
        titleThai: 'ก็อดซิลล่า ปะทะ คอง',
        titleEng: 'Godzilla x Kong: The New Empire',
        genres: ['แอ็คชัน', 'ไซไฟ'],
        duration: '1 ชม. 55 นาที',
        rating: '7.6',
        reviews: '13.8k',
        releaseDate: '29 Mar 2024',
        ageLimit: '13+',
        backdropImage: 'https://picsum.photos/seed/gxk-bg/1600/900',
        trailerImage: 'https://picsum.photos/seed/gxk-trailer/1280/720',
        description: 'เมื่อภัยใหม่จากโลกโพรงลึกปรากฏขึ้น ไททันทั้งสองต้องจับมือกันเพื่อปกป้องโลก',
        showtimes: [{
            cinema: 'Paragon Cineplex',
            distance: '1.2 km away',
            amenities: ['Parking', 'Food'],
            systems: [{
                format: '4DX',
                type: 'TH/EN SUB',
                times: [{ time: '12:15', hall: 'Hall 3' }, { time: '15:00', hall: 'Hall 3' }, { time: '20:20', hall: 'Hall 3' }]
            }]
        }],
        cast: [
            { name: 'Rebecca Hall', role: 'Ilene Andrews', image: 'https://i.pravatar.cc/200?img=41' },
            { name: 'Brian Tyree Henry', role: 'Bernie', image: 'https://i.pravatar.cc/200?img=42' },
            { name: 'Dan Stevens', role: 'Trapper', image: 'https://i.pravatar.cc/200?img=43' }
        ]
    },
    'deadpool-wolverine': {
        id: 'deadpool-wolverine',
        titleThai: 'เดดพูล & วูล์ฟเวอรีน',
        titleEng: 'Deadpool & Wolverine',
        genres: ['แอ็คชัน', 'คอมเมดี้'],
        duration: '2 ชม. 7 นาที',
        rating: '8.5',
        reviews: '24.2k',
        releaseDate: '26 Jul 2024',
        ageLimit: '18+',
        backdropImage: 'https://picsum.photos/seed/dw-bg/1600/900',
        trailerImage: 'https://picsum.photos/seed/dw-trailer/1280/720',
        description: 'เดดพูลถูกดึงเข้าสู่ภารกิจวุ่นวายข้ามจักรวาลและต้องร่วมมือกับวูล์ฟเวอรีน',
        showtimes: [{
            cinema: 'Major Cineplex Sukhumvit',
            distance: '3.5 km away',
            amenities: ['Parking', 'Food', 'WiFi'],
            systems: [{
                format: 'IMAX',
                type: 'TH/EN SUB',
                times: [{ time: '11:30', hall: 'Hall 5' }, { time: '16:20', hall: 'Hall 5' }, { time: '21:10', hall: 'Hall 5' }]
            }]
        }],
        cast: [
            { name: 'Ryan Reynolds', role: 'Deadpool', image: 'https://i.pravatar.cc/200?img=51' },
            { name: 'Hugh Jackman', role: 'Wolverine', image: 'https://i.pravatar.cc/200?img=52' },
            { name: 'Emma Corrin', role: 'Cassandra Nova', image: 'https://i.pravatar.cc/200?img=53' }
        ]
    },
    'despicable-me-4': {
        id: 'despicable-me-4',
        titleThai: 'มินเนี่ยน 4',
        titleEng: 'Despicable Me 4',
        genres: ['แอนิเมชัน', 'คอมเมดี้'],
        duration: '1 ชม. 34 นาที',
        rating: '7.4',
        reviews: '10.3k',
        releaseDate: '3 Jul 2024',
        ageLimit: 'G',
        backdropImage: 'https://picsum.photos/seed/dm4-bg/1600/900',
        trailerImage: 'https://picsum.photos/seed/dm4-trailer/1280/720',
        description: 'ครอบครัวของกรูต้องเผชิญวายร้ายคนใหม่ พร้อมความป่วนระดับมินเนี่ยน',
        showtimes: [{
            cinema: 'Icon Siam Cineplex',
            distance: '2.1 km away',
            amenities: ['Parking', 'Food'],
            systems: [{
                format: 'Digital 2D',
                type: 'Thai Dub',
                times: [{ time: '09:50', hall: 'Hall 4' }, { time: '12:10', hall: 'Hall 4' }, { time: '14:30', hall: 'Hall 4' }]
            }]
        }],
        cast: [
            { name: 'Steve Carell', role: 'Gru', image: 'https://i.pravatar.cc/200?img=61' },
            { name: 'Kristen Wiig', role: 'Lucy', image: 'https://i.pravatar.cc/200?img=62' },
            { name: 'Pierre Coffin', role: 'Minions', image: 'https://i.pravatar.cc/200?img=63' }
        ]
    },
    wicked: {
        id: 'wicked',
        titleThai: 'วิคเค็ด',
        titleEng: 'Wicked',
        genres: ['แฟนตาซี', 'มิวสิคัล'],
        duration: '2 ชม. 40 นาที',
        rating: '8.1',
        reviews: '9.6k',
        releaseDate: '22 Nov 2024',
        ageLimit: 'G',
        backdropImage: 'https://picsum.photos/seed/wicked-bg/1600/900',
        trailerImage: 'https://picsum.photos/seed/wicked-trailer/1280/720',
        description: 'เรื่องราวก่อนพ่อมดแห่งออซ เมื่อเอลฟาบาและกลินดาพบมิตรภาพที่เปลี่ยนโชคชะตา',
        showtimes: [{
            cinema: 'Paragon Cineplex',
            distance: '1.2 km away',
            amenities: ['Parking', 'Food'],
            systems: [{
                format: 'Dolby Atmos',
                type: 'EN SUB',
                times: [{ time: '10:50', hall: 'Hall 8' }, { time: '15:10', hall: 'Hall 8' }, { time: '19:40', hall: 'Hall 8' }]
            }]
        }],
        cast: [
            { name: 'Cynthia Erivo', role: 'Elphaba', image: 'https://i.pravatar.cc/200?img=71' },
            { name: 'Ariana Grande', role: 'Glinda', image: 'https://i.pravatar.cc/200?img=72' },
            { name: 'Jonathan Bailey', role: 'Fiyero', image: 'https://i.pravatar.cc/200?img=73' }
        ]
    },
    'gladiator-2': {
        id: 'gladiator-2',
        titleThai: 'แกลดิเอเตอร์ 2',
        titleEng: 'Gladiator II',
        genres: ['แอ็คชัน', 'ดราม่า'],
        duration: '2 ชม. 28 นาที',
        rating: '8.0',
        reviews: '7.2k',
        releaseDate: '15 Nov 2024',
        ageLimit: '16+',
        backdropImage: 'https://picsum.photos/seed/gladiator2-bg/1600/900',
        trailerImage: 'https://picsum.photos/seed/gladiator2-trailer/1280/720',
        description: 'สังเวียนนักรบกลับมาอีกครั้งกับศึกอำนาจแห่งจักรวรรดิโรมที่โหดเหี้ยมกว่าเดิม',
        showtimes: [{
            cinema: 'Major Cineplex Sukhumvit',
            distance: '3.5 km away',
            amenities: ['Parking', 'Food', 'WiFi'],
            systems: [{
                format: 'Standard 2D',
                type: 'EN SUB',
                times: [{ time: '12:40', hall: 'Theater 3' }, { time: '17:00', hall: 'Theater 3' }, { time: '20:40', hall: 'Theater 3' }]
            }]
        }],
        cast: [
            { name: 'Paul Mescal', role: 'Lucius', image: 'https://i.pravatar.cc/200?img=81' },
            { name: 'Pedro Pascal', role: 'Marcus', image: 'https://i.pravatar.cc/200?img=82' },
            { name: 'Denzel Washington', role: 'Macrinus', image: 'https://i.pravatar.cc/200?img=83' }
        ]
    },
    'moana-2': {
        id: 'moana-2',
        titleThai: 'โมอาน่า 2',
        titleEng: 'Moana 2',
        genres: ['แอนิเมชัน', 'ผจญภัย'],
        duration: '1 ชม. 40 นาที',
        rating: '7.8',
        reviews: '8.4k',
        releaseDate: '27 Nov 2024',
        ageLimit: 'G',
        backdropImage: 'https://picsum.photos/seed/moana2-bg/1600/900',
        trailerImage: 'https://picsum.photos/seed/moana2-trailer/1280/720',
        description: 'โมอาน่าออกเดินทางครั้งใหม่สู่มหาสมุทรไกลโพ้นเพื่อแก้ปริศนาแห่งบรรพชน',
        showtimes: [{
            cinema: 'Icon Siam Cineplex',
            distance: '2.1 km away',
            amenities: ['Parking', 'Food'],
            systems: [{
                format: 'Digital 2D',
                type: 'Thai Dub / EN SUB',
                times: [{ time: '10:30', hall: 'Hall 7' }, { time: '13:10', hall: 'Hall 7' }, { time: '15:50', hall: 'Hall 7' }]
            }]
        }],
        cast: [
            { name: 'Auliʻi Cravalho', role: 'Moana', image: 'https://i.pravatar.cc/200?img=91' },
            { name: 'Dwayne Johnson', role: 'Maui', image: 'https://i.pravatar.cc/200?img=92' },
            { name: 'Temuera Morrison', role: 'Chief Tui', image: 'https://i.pravatar.cc/200?img=93' }
        ]
    },
    'a-minecraft-movie': {
        id: 'a-minecraft-movie',
        titleThai: 'ไมน์คราฟต์ เดอะมูฟวี่',
        titleEng: 'A Minecraft Movie',
        genres: ['ผจญภัย', 'คอมเมดี้'],
        duration: '1 ชม. 49 นาที',
        rating: '7.2',
        reviews: '6.7k',
        releaseDate: '4 Apr 2025',
        ageLimit: 'G',
        backdropImage: 'https://picsum.photos/seed/minecraft-movie-bg/1600/900',
        trailerImage: 'https://picsum.photos/seed/minecraft-movie-trailer/1280/720',
        description: 'การผจญภัยในโลกบล็อกที่เต็มไปด้วยสิ่งมีชีวิตสุดป่วนและภารกิจสุดท้าทาย',
        showtimes: [{
            cinema: 'Paragon Cineplex',
            distance: '1.2 km away',
            amenities: ['Parking', 'Food', 'WiFi'],
            systems: [{
                format: 'Digital 2D',
                type: 'Thai Dub / EN SUB',
                times: [{ time: '11:40', hall: 'Hall 9' }, { time: '14:20', hall: 'Hall 9' }, { time: '18:10', hall: 'Hall 9' }]
            }]
        }],
        cast: [
            { name: 'Jason Momoa', role: 'Garrett', image: 'https://i.pravatar.cc/200?img=5' },
            { name: 'Jack Black', role: 'Steve', image: 'https://i.pravatar.cc/200?img=6' },
            { name: 'Emma Myers', role: 'Natalie', image: 'https://i.pravatar.cc/200?img=7' }
        ]
    }
};

Object.assign(moviesDatabase, additionalMovies);

const legacyImageFixes = {
    'death-whisperer-2': {
        backdropImage: 'https://picsum.photos/seed/death-whisperer-2/1600/900',
        trailerImage: 'https://picsum.photos/seed/death-whisperer-2-trailer/1280/720'
    },
    'the-marvels': {
        backdropImage: 'https://picsum.photos/seed/the-marvels/1600/900',
        trailerImage: 'https://picsum.photos/seed/the-marvels-trailer/1280/720'
    },
    'hunger-games': {
        backdropImage: 'https://picsum.photos/seed/hunger-games/1600/900',
        trailerImage: 'https://picsum.photos/seed/hunger-games-trailer/1280/720'
    },
    'killers-of-the-flower-moon': {
        backdropImage: 'https://picsum.photos/seed/killers-of-the-flower-moon/1600/900',
        trailerImage: 'https://picsum.photos/seed/killers-of-the-flower-moon-trailer/1280/720'
    },
    'trolls-band-together': {
        backdropImage: 'https://picsum.photos/seed/trolls-band-together/1600/900',
        trailerImage: 'https://picsum.photos/seed/trolls-band-together-trailer/1280/720'
    }
};

Object.entries(legacyImageFixes).forEach(([movieId, imageData]) => {
    if (moviesDatabase[movieId]) {
        moviesDatabase[movieId] = {
            ...moviesDatabase[movieId],
            ...imageData
        };
    }
});

const posterCache = new Map();

function getCachedPoster(movieId) {
    if (posterCache.has(movieId)) {
        return posterCache.get(movieId);
    }
    try {
        const saved = localStorage.getItem(`cinema.poster.${movieId}`);
        if (saved) {
            posterCache.set(movieId, saved);
            return saved;
        }
    } catch (_error) {
    }
    return null;
}

function setCachedPoster(movieId, posterUrl) {
    if (!movieId || !posterUrl) return;
    posterCache.set(movieId, posterUrl);
    try {
        localStorage.setItem(`cinema.poster.${movieId}`, posterUrl);
    } catch (_error) {
    }
}

async function fetchWikipediaPosterByTitle(title) {
    const normalizedTitle = String(title || '').trim();
    if (!normalizedTitle) return null;

    const candidates = [
        normalizedTitle,
        `${normalizedTitle} (film)`,
        `${normalizedTitle} (2024 film)`,
        `${normalizedTitle} (2025 film)`
    ];

    for (const candidate of candidates) {
        const slug = encodeURIComponent(candidate.replace(/\s+/g, '_'));
        try {
            const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`);
            if (!response.ok) continue;
            const data = await response.json();
            const imageUrl = data?.originalimage?.source || data?.thumbnail?.source || null;
            if (imageUrl) return imageUrl;
        } catch (_error) {
        }
    }

    return null;
}

async function getRealMoviePoster(movie) {
    if (!movie?.id) {
        return null;
    }

    const cached = getCachedPoster(movie.id);
    if (cached) return cached;

    const posterFromWiki = await fetchWikipediaPosterByTitle(movie.titleEng || movie.titleThai);
    if (posterFromWiki) {
        setCachedPoster(movie.id, posterFromWiki);
        return posterFromWiki;
    }

    const fallback = movie.backdropImage || movie.trailerImage || null;
    if (fallback) {
        setCachedPoster(movie.id, fallback);
    }
    return fallback;
}

window.cinemaMovieImages = {
    getRealMoviePoster
};
