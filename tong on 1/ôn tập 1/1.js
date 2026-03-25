let songs = JSON.parse(localStorage.getItem("songs")) || [];
let editId = null;

const titleInput = document.getElementById("title");
const artistInput = document.getElementById("artist");
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const songTable = document.getElementById("songTable");
const searchInput = document.getElementById("search");
//Chuc nang 1:them bai
function addSong() {
    const title = titleInput.value.trim();
    const artist = artistInput.value.trim();

    if (title === "" || artist === "") {
        alert("Khong duoc de trong!");
        return;
    }

    const newSong = {
        id: songs.length > 0 ? songs[songs.length - 1].id + 1 : 1,
        title: title,
        artist: artist
    };
    songs.push(newSong);

    localStorage.setItem("songs", JSON.stringify(songs));
    renderSongs();
    titleInput.value = "";
    artistInput.value = "";
}
// Chuc nang 2: Hien thi danh sach bai hat
function renderSongs(data = songs) {
    songTable.innerHTML = "";
    data.forEach((song) => {
        const row = `
            <tr>
                <td>${song.id}</td>
                <td>${song.title}</td>
                <td>${song.artist}</td>
                <td>
                    <button onclick="editSong(${song.id})">Sua</button>
                    <button onclick="deleteSong(${song.id})">Xoa</button>
                </td>
            </tr>
        `;
        songTable.innerHTML += row;
    });
}

// Chuc nang 3
function editSong(id) {
    const song = songs.find(s => s.id === id);
    if (song) {
        titleInput.value = song.title;
        artistInput.value = song.artist;
        editId = id;
        addBtn.style.display = "none";
        updateBtn.style.display = "inline-block";
        formTitle.innerText = "🎵 Sua bai hat";
    }
}
function updateSong() {
    const title = titleInput.value.trim();
    const artist = artistInput.value.trim();

    if (title === "" || artist === "") {
        alert("Khong duoc de trong!");
        return;
    }

    for (let i = 0; i < songs.length; i++) {
        if (songs[i].id === editId) {
            songs[i].title = title;
            songs[i].artist = artist;
            break;
        }
    }
    
    editId = null;
    addBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
    formTitle.innerText = "🎵 Them bai hat";

    localStorage.setItem("songs", JSON.stringify(songs));
    renderSongs();
    titleInput.value = "";
    artistInput.value = "";
}

// Chuc nang 4: Xoa bai hat
function deleteSong(id) {
    if (confirm("Ban co chac chan muon xoa?")) {
        songs = songs.filter(song => song.id !== id);
        localStorage.setItem("songs", JSON.stringify(songs));
        renderSongs();
    }
}

// Chuc nang 5: Tim kiem bai hat (Realtime)
function searchSong() {
    const keyword = searchInput.value.toLowerCase();
    const filteredSongs = songs.filter(song => 
        song.title.toLowerCase().includes(keyword)
    );
    renderSongs(filteredSongs);
}

renderSongs();
