import { fetchTeamData } from './api.js';

function renderTeam(response) {
    const teamList = document.querySelector('[data-js="team-list"]');
    const members = Array.isArray(response) ? response : response?.anggota;

    if (!teamList || !Array.isArray(members)) return;

    teamList.replaceChildren(...members.map((member) => {
        const card = document.createElement('article');
        card.className = 'bg-paper border border-border border-t-[3px] border-t-primary rounded-b-sm overflow-hidden h-full text-left';
        card.dataset.animate = 'fade-up';

        const body = document.createElement('div');
        body.className = 'p-lg';

        const image = document.createElement('img');
        image.className = 'w-[72px] h-[72px] rounded-full object-cover mb-md border-2 border-border';
        image.src = member.image;
        image.alt = `Foto ${member.name}`;
        image.loading = 'lazy';

        const name = document.createElement('h3');
        name.className = 'font-sans font-bold text-[1.05rem] text-text mb-xs';
        name.textContent = member.name;

        const role = document.createElement('p');
        role.className = 'text-primary text-sm font-medium mb-sm';
        role.textContent = member.role;

        const details = document.createElement('div');
        details.className = 'flex flex-wrap gap-sm text-sm text-text-muted';
        details.textContent = `Angkatan ${member.angkatan} | NIM ${member.nim}`;

        body.append(image, name, role, details);
        card.append(body);
        return card;
    }));

    document.querySelectorAll('[data-animate]:not(.is-visible)').forEach((element) => {
        element.classList.add('is-visible');
    });
}

const team = await fetchTeamData();
renderTeam(team);
