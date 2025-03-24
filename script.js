document.addEventListener('DOMContentLoaded', () => {
    showSection('summary', document.querySelector('a[href="#summary"]'));
    document.querySelector('.certificate-button').classList.add('active');
    keepPageScrolledDown();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) {
            showSection(targetSection.id, this);
        }
    });
});

document.querySelectorAll('.certificate-button').forEach(button => {
    button.addEventListener('mouseover', function () {
        this.classList.add('hover');
    });
    button.addEventListener('mouseout', function () {
        this.classList.remove('hover');
    });
    button.addEventListener('click', function () {
        showCertificate(this.getAttribute('onclick').match(/'([^']+)'/)[1], this);
        scrollToBottom();
    });
});

document.getElementById('certificate-img').addEventListener('click', function () {
    this.classList.toggle('fullscreen');
    if (this.classList.contains('fullscreen')) {
        keepPageScrolledDown();
    } else {
        scrollToBottomSlowly();
    }
});

function showDownloadButton() {
    document.getElementById('download-link').style.display = 'inline';
}

function showSection(sectionId, activeButton) {
    const sections = document.querySelectorAll('main > section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
            section.style.opacity = '1';
        } else {
            section.style.display = 'none';
            section.style.opacity = '0';
        }
    });
    highlightButton(activeButton);
}

function showCertificate(imageSrc, activeButton) {
    const certificateImg = document.getElementById('certificate-img');
    certificateImg.classList.add('slide-out');
    setTimeout(() => {
        certificateImg.src = imageSrc;
        certificateImg.classList.remove('slide-out');
        certificateImg.classList.add('slide-in');
        setTimeout(() => {
            certificateImg.classList.remove('slide-in');
        }, 500);
    }, 500);
    highlightButton(activeButton);
    keepPageScrolledDown();
}

function highlightButton(activeButton) {
    document.querySelectorAll('nav ul li a, .certificate-button').forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight * 0.7,
        behavior: 'smooth'
    });
}

function scrollToBottomSlowly() {
    window.scrollTo({
        top: document.body.scrollHeight * 0.7,
        behavior: 'smooth'
    });
    setTimeout(() => {
        window.scrollTo({
            top: document.body.scrollHeight * 0.7,
            behavior: 'smooth'
        });
    }, 1000); // Slow down the scroll to match the transition speed
}

function keepPageScrolledDown() {
    const certificatesSection = document.getElementById('certificates');
    certificatesSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
