// 장소 정보
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
    }
];

// 장소 정보 표시 함수
function displayPlaces(places) {
    const placeList = document.getElementById('place-list');
    placeList.innerHTML = ''; // 기존 목록을 지웁니다.

    places.forEach((place, index) => {
        const card = document.createElement('div');
        card.className = 'place-card';
        card.innerHTML = `
            <img src="${place.image}" alt="${place.name}" loading="lazy">
            <h2>${place.name}</h2>
            <p>낭만: <span id="like-count-${index}">${place.likes}</span>개</p> <!-- 좋아요 개수 표시 -->
        `;
        card.onclick = () => showPopup(place, index); // 카드 클릭 시 팝업 표시
        placeList.appendChild(card);
    });
}

// 팝업에 좋아요 버튼 및 개수 표시
function showPopup(place, index) {
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const popupAddress = document.getElementById('popup-address');
    const likeButton = document.getElementById('like-button');
    const likeCount = document.getElementById('like-count-value');

    popupTitle.textContent = place.name;
    popupDescription.innerHTML = place.description;
    popupAddress.textContent = place.address;

    likeCount.textContent = place.likes; // 초기 좋아요 개수 표시

    // 좋아요 버튼 클릭 시 처리
    likeButton.onclick = () => {
        place.likes++; // 좋아요 증가
        document.getElementById(`like-count-${index}`).textContent = place.likes; // 카드 내 좋아요 개수 업데이트
        likeCount.textContent = place.likes; // 팝업 내 좋아요 개수 업데이트
    };

    document.getElementById('popup').style.display = 'flex'; // 팝업 열기
}

// 팝업 닫기
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// 검색 및 카테고리 변경 시 필터링 적용
function filterPlaces() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const categoryValue = document.getElementById('category').value;

    const filteredPlaces = places.filter(place => {
        const matchesSearch = place.name.toLowerCase().includes(searchValue) || place.description.toLowerCase().includes(searchValue);
        const matchesCategory = categoryValue ? place.category === categoryValue : true;

        return matchesSearch && matchesCategory;
    });

    displayPlaces(filteredPlaces);
}

// 검색 및 카테고리 선택 이벤트 리스너 추가
document.getElementById('search').addEventListener('input', filterPlaces);
document.getElementById('category').addEventListener('change', filterPlaces);

// 페이지 로드 시 장소 표시
window.onload = () => {
    displayPlaces(places); // 초기 장소 목록 표시
};

// 날씨 정보 관련 변수
const API_KEY = 'to3tPztQheE1LjCE+XYxxQutrDEQVVkbycZTltv7DFfIlcIzjPCBxy6pHUvzZQc8yTXpXac1XEx2r5bs0iDYzg=='; // 인증키
const NX = 60; // 서울 X 좌표
const NY = 127; // 서울 Y 좌표

// 귀엽고 랜덤한 메시지와 이모티콘 목록
const cuteMessages = {
    good: [
        "오늘은 햇살 가득한 날이에요! 🌞",
        "맑고 푸른 하늘이 기분을 좋게 해요! 😊",
        "완벽한 날씨! 바깥에 나가고 싶어요! 🏞️",
        "하늘도 기분 좋게 웃고 있어요! 😄"
    ],
    bad: [
        "구름이 잔뜩 낀 날씨네요. ☁️",
        "오늘은 우울한 날씨에요. 🌧️",
        "흐린 날씨는 무슨 일이 있었을까요? 😕",
        "비가 올 것 같아요. ☔"
    ]
};

// 날씨 정보를 가져오는 함수
async function fetchWeather() {
    const now = new Date();
    const baseDate = now.toISOString().slice(0, 10).replace(/-/g, ''); // 현재 날짜
    const baseTime = now.getMinutes() < 45
        ? ('0' + (now.getHours() - 1)).slice(-2) + '30' // 이전 시간으로 설정
        : ('0' + now.getHours()).slice(-2) + '30';

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
        
        if (data.response?.body?.items?.item) {
            displayWeather(data.response.body.items.item);
        } else {
            throw new Error('Invalid data structure');
        }
    } catch (error) {
        console.error('날씨 정보를 가져오는 데 실패했습니다:', error);
        alert('날씨 정보를 가져오는 데 실패했습니다.');
    }
}

// 날씨 정보를 화면에 표시하는 함수
function displayWeather(items) {
    const temperature = items.find(item => item.category === 'T1H')?.obsrValue; // 기온
    const skyCondition = items.find(item => item.category === 'SKY')?.obsrValue; // 하늘 상태

    const skyDescription = skyCondition === '1' ? '맑음' :
                           skyCondition === '3' ? '구름 많음' : '흐림';

    const weatherContainer = document.getElementById('weather');
    weatherContainer.innerHTML = `
        <h2>서울의 현재 날씨</h2>
        <p>온도: ${temperature}°C</p>
        <p>상태: ${skyDescription}</p>
    `;

    // 날씨 상태에 맞는 메시지와 이모티콘 랜덤 선택
    const message = skyCondition === '1' ? getRandomMessage('good') : getRandomMessage('bad');
    const messageContainer = document.getElementById('message');
    messageContainer.innerHTML = `
        <p>${message}</p>
    `;
}

// 랜덤 메시지를 반환하는 함수
function getRandomMessage(type) {
    const messages = cuteMessages[type];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

// 사용자가 버튼을 클릭하면 날씨 정보를 업데이트하는 함수
async function updateWeather() {
    const updateButton = document.getElementById('updateButton');
    updateButton.disabled = true; // 버튼 비활성화
    updateButton.innerText = '업데이트 중...'; // 버튼 텍스트 변경

    await fetchWeather(); // 날씨 정보 갱신

    // 업데이트가 완료된 후 버튼 상태 변경
    updateButton.disabled = false; // 버튼 활성화
    updateButton.innerText = '날씨 업데이트'; // 버튼 텍스트 원래대로
}
