function updateTime() {
    const now  = new Date();

    const hours = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');

    const currentTime = `${hours}:${mins}`;

    document.getElementById('time').textContent = currentTime;
}
window.onload = function() {
    updateTime();
    setInterval(updateTime, 1000);
}




//padStart 숫자앞에 0붙이는거 padStart(앞에 몇칸채울지 , 뒤에는 무슨숫자로)