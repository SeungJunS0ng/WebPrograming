const places = [
    {
        name: "초평가배",
        description: "깔끔한 한옥 스타일의 매장에 커피뿐만 아니라 전통차와 한과류 디저트도 다양하게 구비되어 있어서 색다른 맛을 즐길 수 있습니다.",
        address: "경기 의왕시 왕송못서길 52 초평가배",
        category: "카페",
        image: "./초평가배.png",
        likes: 0
    },
    {
        name: "이자카야 카와우소",
        description: "일식 이자카야이지만 단정한 분위기인 가게와 흔하지 않은 jpop이 그 분위기를 더욱 돋보이게 만들어주며, 음식 또한 깔끔합니다.",
        address: "서울 관악구 남현1길 66 2층",
        category: "식당",
        image: "./이자카야 카와우소.png",
        likes: 0
    },
    {
        name: "이태원부군당역사공원",
        description: "그냥 언제가도 너무 좋은 곳...",
        address: "서울 용산구 녹사평대로40다길 33",
        category: "풍경",
        image: "./이태원공원.png",
        likes: 0
    },
    {
        name: "왕송호수",
        description: "천천히 걷다보면 1분에 한 번씩 바뀌는 주변 풍경과 하늘 색이 참 아름다운 곳",
        address: "경기 의왕시 초평동",
        category: "풍경",
        image: "./왕송호수.png",
        likes: 0
    },
    {
        name: "남산타워",
        description: "서울 시내와 주변을 한눈에 볼 수 있는 인기 있는 관광 명소높이는 약 236.7미터로, 타워의 꼭대기까지 올라가면 서울의 전경을 360도 파노라마로 감상할 수 있다.",
        address: "서울 남산",
        category: "풍경",
        image: "./남산타워.png",
        likes: 0
    }
];

const musicList = [
    {
        name: "자니",
        artist: "프라이머리",
        genre: "힙합(랩)"
    },
    {
        name: "Don't feel sad",
        artist: "WhiteUsedSocks",
        genre: "인디음악"
    },
    {
        name: "Don't Cry",
        artist: "HOZIHO",
        genre: "발라드"
    },
    {
        name: "나쁜 날",
        artist: "도후",
        genre: "인디음악"
    },
    {
        name: "너는 나를 단 한 번도 사랑한 적 없었다니까",
        artist: "지호",
        genre: "발라드"
    },
    {
        name: "목화",
        artist: "보수동쿨러",
        genre: "인디음악"
    },
    {
        name: "독",
        artist: "프라이머리리",
        genre: "힙합(랩)"
    },
    {
        name: "등대",
        artist: "하현상",
        genre: "발라드"
    }
];

const API_KEY = 'to3tPztQheE1LjCE+XYxxQutrDEQVVkbycZTltv7DFfIlcIzjPCBxy6pHUvzZQc8yTXpXac1XEx2r5bs0iDYzg==';
const NX = 60;
const NY = 127;

const cuteMessages = {
    good: ["오늘은 햇살 가득한 날이에요! 🌞", "맑고 푸른 하늘이 기분을 좋게 해요! 😊", "완벽한 날씨! 바깥에 나가고 싶어요! 🏞️", "하늘도 기분 좋게 웃고 있어요! 😄"],
    bad: ["구름이 잔뜩 낀 날씨네요. ☁️", "오늘은 우울한 날씨에요. 🌧️", "흐린 날씨는 무슨 일이 있었을까요? 😕", "비가 올 것 같아요. ☔"]
};

// 장소 리스트 출력
function displayPlaces(places) {
    const placeList = document.getElementById('place-list');
    placeList.innerHTML = ''; // 기존 내용 제거

    places.forEach((place, index) => {
        const card = document.createElement('div');
        card.className = 'place-card';
        card.innerHTML = `
            <img src="${place.image}" alt="${place.name}" loading="lazy">
            <h2>${place.name}</h2>
            <p>낭만: <span id="like-count-${index}">${place.likes}</span>개</p>
        `;
        card.onclick = () => showPopup(place, index);
        placeList.appendChild(card);
    });
}

// 팝업 표시
function showPopup(place, index) {
    const popup = document.getElementById('popup');
    const likeCount = document.getElementById('like-count-value');

    document.getElementById('popup-title').textContent = place.name;
    document.getElementById('popup-description').innerHTML = place.description;
    document.getElementById('popup-address').textContent = place.address;

    likeCount.textContent = place.likes;
    document.getElementById('like-button').onclick = () => updateLikes(place, index, likeCount);

    popup.style.display = 'flex';
}

// 좋아요 업데이트
function updateLikes(place, index, likeCount) {
    place.likes++;
    document.getElementById(`like-count-${index}`).textContent = place.likes;
    likeCount.textContent = place.likes;
}

// 팝업 닫기
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// 검색 및 카테고리 필터링
function filterPlaces() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const categoryValue = document.getElementById('category').value;

    const filteredPlaces = places.filter(place =>
        (place.name.toLowerCase().includes(searchValue) || place.description.toLowerCase().includes(searchValue)) &&
        (!categoryValue || place.category === categoryValue)
    );

    displayPlaces(filteredPlaces); // 필터링된 장소들 표시
}

// 음악 리스트 출력
function displayMusicList(musicList) {
    const musicListContainer = document.getElementById('music-list');
    musicListContainer.innerHTML = '';

    musicList.forEach((music) => {
        const card = document.createElement('div');
        card.className = 'place-card';
        card.innerHTML = `
            <h2>${music.name}</h2>
            <p>${music.artist} - ${music.genre}</p>
        `;
        musicListContainer.appendChild(card);
    });
}

// 날씨 정보 가져오기
async function fetchWeather() {
    const now = new Date();
    const baseDate = now.toISOString().slice(0, 10).replace(/-/g, ''); // 날짜 포맷 변경
    const baseTime = now.getMinutes() < 45
        ? `${('0' + (now.getHours() - 1)).slice(-2)}30`
        : `${('0' + now.getHours()).slice(-2)}30`; // 시간 포맷 변경

    const params = new URLSearchParams({
        serviceKey: API_KEY,
        pageNo: 1,
        numOfRows: 10,
        dataType: 'JSON',
        base_date: baseDate,
        base_time: baseTime,
        nx: NX,
        ny: NY
    });

    try {
        const response = await fetch(`http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?${params}`);
        const data = await response.json();
        const items = data.response?.body?.items?.item;

        if (items) {
            displayWeather(items); // 날씨 정보 표시
        } else {
            throw new Error('Invalid data structure');
        }
    } catch (error) {
        console.error('날씨 정보를 가져오는 데 실패했습니다:', error);
        alert('날씨 정보를 가져오는 데 실패했습니다.');
    }
}

// 날씨 정보 표시
function displayWeather(items) {
    const temperature = items.find(item => item.category === 'T1H')?.obsrValue;
    const skyCondition = items.find(item => item.category === 'SKY')?.obsrValue;

    const skyDescription = skyCondition === '1' ? '맑음' : skyCondition === '3' ? '구름 많음' : '흐림';

    document.getElementById('weather').innerHTML = `
        <h2>서울의 현재 날씨</h2>
        <p>온도: ${temperature}°C</p>
        <p>상태: ${skyDescription}</p>
    `;

    document.getElementById('message').innerHTML = `<p>${getRandomMessage(skyCondition === '1' ? 'good' : 'bad')}</p>`; // 날씨에 맞는 메시지 표시
}

// 날씨 메시지 선택
function getRandomMessage(type) {
    const messages = cuteMessages[type];
    return messages[Math.floor(Math.random() * messages.length)]; // 랜덤 메시지 선택
}

// 날씨 업데이트
async function updateWeather() {
    const updateButton = document.getElementById('updateButton');
    updateButton.disabled = true;
    updateButton.innerText = '업데이트 중...';

    await fetchWeather(); // 날씨 정보 갱신

    updateButton.disabled = false;
    updateButton.innerText = '날씨 업데이트';
}

// 페이지 로드 시 실행
window.onload = function() {
    displayPlaces(places); // 처음엔 모든 장소 표시
    displayMusicList(musicList); // 음악 리스트 표시
    fetchWeather(); // 날씨 정보 표시

    // 날씨 업데이트 버튼 클릭 이벤트 추가
    document.getElementById('update-weather-button').addEventListener('click', fetchWeather);
};
