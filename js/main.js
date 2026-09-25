import { fetchTeamData } from './api.js';
const team = await fetchTeamData();
renderTeam(team);
