// 이미지 변경 및 탭 기능을 위한 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // 탭 초기화
    const defaultTab = document.querySelector('.tab-btn.active');
    if (defaultTab) {
        const tabId = defaultTab.getAttribute('onclick').match(/openTab\(event, '(.+?)'\)/)[1];
        document.getElementById(tabId).classList.add('active');
    }
    
    // 이미지 확대 기능 초기화
    initImageZoom();
});

// 이미지 변경 함수
function changeImage(element) {
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        mainImage.src = element.src;
        
        // 활성 썸네일 표시
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => {
            thumb.classList.remove('active');
        });
        element.classList.add('active');
        
        // 이미지 확대 기능 재초기화
        initImageZoom();
    }
}

// 탭 열기 함수
function openTab(evt, tabName) {
    // 모든 탭 내용 숨기기
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // 모든 탭 버튼 비활성화
    const tabButtons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // 선택한 탭 내용 표시 및 버튼 활성화
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// 이미지 확대 기능
function initImageZoom() {
    const mainImage = document.getElementById('mainProductImage');
    if (!mainImage) return;
    
    // 이미지가 로드된 후에 확대 기능 초기화
    mainImage.onload = function() {
        // 이미지 컨테이너 크기 조정
        const container = mainImage.parentElement;
        if (container) {
            // 이미지가 잘리지 않도록 컨테이너 높이 조정
            container.style.height = 'auto';
            
            // 이미지 크기 조정
            mainImage.style.width = '100%';
            mainImage.style.height = 'auto';
            mainImage.style.objectFit = 'contain';
            mainImage.style.maxHeight = 'none';
        }
    };
    
    // 이미 로드된 이미지인 경우 수동으로 onload 이벤트 트리거
    if (mainImage.complete) {
        mainImage.onload();
    }
}

// 폼 유효성 검사
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // 이름 검사
    if (name && name.value.trim() === '') {
        showError(name, '이름을 입력해주세요.');
        isValid = false;
    } else if (name) {
        removeError(name);
    }
    
    // 이메일 검사
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            showError(email, '이메일을 입력해주세요.');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, '유효한 이메일 주소를 입력해주세요.');
            isValid = false;
        } else {
            removeError(email);
        }
    }
    
    // 전화번호 검사
    if (phone) {
        const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
        if (phone.value.trim() === '') {
            showError(phone, '전화번호를 입력해주세요.');
            isValid = false;
        } else if (!phoneRegex.test(phone.value)) {
            showError(phone, '올바른 전화번호 형식(예: 010-1234-5678)으로 입력해주세요.');
            isValid = false;
        } else {
            removeError(phone);
        }
    }
    
    // 메시지 검사
    if (message && message.value.trim() === '') {
        showError(message, '문의 내용을 입력해주세요.');
        isValid = false;
    } else if (message) {
        removeError(message);
    }
    
    if (isValid) {
        // 폼 데이터 임시 저장
        localStorage.setItem('contactFormName', name ? name.value : '');
        localStorage.setItem('contactFormEmail', email ? email.value : '');
        localStorage.setItem('contactFormPhone', phone ? phone.value : '');
        localStorage.setItem('contactFormMessage', message ? message.value : '');
        
        // 성공 메시지 표시
        alert('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
    }
    
    return isValid;
}

// 오류 메시지 표시
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        const msgElement = document.createElement('div');
        msgElement.className = 'error-message';
        msgElement.textContent = message;
        formGroup.appendChild(msgElement);
    } else {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    input.classList.add('error');
}

// 오류 메시지 제거
function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    input.classList.remove('error');
}

// 폼 데이터 복원
function restoreFormData() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');
    
    if (name) name.value = localStorage.getItem('contactFormName') || '';
    if (email) email.value = localStorage.getItem('contactFormEmail') || '';
    if (phone) phone.value = localStorage.getItem('contactFormPhone') || '';
    if (message) message.value = localStorage.getItem('contactFormMessage') || '';
}

// 페이지 로드 시 폼 데이터 복원
window.addEventListener('load', function() {
    restoreFormData();
});
