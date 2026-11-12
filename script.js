const fields = ['name', 'title', 'email', 'phone', 'links', 'summary', 'projects', 'education'];

const defaults = {
  name: 'Your Full Name',
  title: 'Your Target Role',
  email: 'email@example.com',
  phone: '+20 100 000 0000 | City, Country',
  links: 'linkedin.com/in/username | github.com/username',
  summary: 'Motivated developer passionate about building clean, user-friendly web applications.',
  projects: '• Add your key projects and achievements on the left panel to preview them here.',
  education: 'University Name — Degree & Graduation Year'
};

function updateCV() {
  const savedData = {};

  fields.forEach(field => {
    const val = document.getElementById(`in-${field}`).value;
    document.getElementById(`out-${field}`).textContent = val.trim() || defaults[field];
    savedData[field] = val;
  });

  // Handle Skills Tags
  const skillsInput = document.getElementById('in-skills').value;
  savedData.skills = skillsInput;
  const skillsContainer = document.getElementById('out-skills');
  skillsContainer.innerHTML = '';

  const skillsArray = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
  const displaySkills = skillsArray.length ? skillsArray : ['HTML', 'CSS', 'JavaScript'];

  displaySkills.forEach(skill => {
    const span = document.createElement('span');
    span.className = 'skill-tag';
    span.textContent = skill;
    skillsContainer.appendChild(span);
  });

  localStorage.setItem('cvBuilderData', JSON.stringify(savedData));
}

function setAccent(color) {
  document.documentElement.style.setProperty('--accent', color);
  localStorage.setItem('cvBuilderAccent', color);
}

function fillSample() {
  document.getElementById('in-name').value = 'Habiba Aboelkheir';
  document.getElementById('in-title').value = 'Web Developer';
  document.getElementById('in-email').value = 'habibaaboelkheir539@gmail.com';
  document.getElementById('in-phone').value = '+20 1000464587 | Alexandria, Egypt';
  document.getElementById('in-links').value = 'Https://www.linkedin.com/in/habiba-aboelkheir-0b01b1409?utm_source=share_via&utm_content=profile&utm_medium=member_ios | github.com/habibaaboelkheir-dev';
  document.getElementById('in-summary').value = "HTML5, CSS3, JavaScript, Python, Git, GitHub, OOP, Data Structures"
  document.getElementById('in-education').value = 'B.Sc. in Computer Science and Artificial Intelligence — Pharos University in Alexandria (PUA) | (Expected 2028)';
  updateCV();
}

function clearForm() {
  fields.forEach(field => document.getElementById(`in-${field}`).value = '');
  document.getElementById('in-skills').value = '';
  localStorage.removeItem('cvBuilderData');
  updateCV();
}

// Load saved state on startup
window.onload = () => {
  const savedAccent = localStorage.getItem('cvBuilderAccent');
  if (savedAccent) setAccent(savedAccent);

  const savedData = JSON.parse(localStorage.getItem('cvBuilderData') || '{}');
  fields.forEach(field => {
    if (savedData[field]) document.getElementById(`in-${field}`).value = savedData[field];
  });
  if (savedData.skills) document.getElementById('in-skills').value = savedData.skills;
  updateCV();
};