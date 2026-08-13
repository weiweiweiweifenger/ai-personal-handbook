const loader = document.querySelector('#loader');
const experience = document.querySelector('.experience');
const bedroom = document.querySelector('#bedroom');
const garden = document.querySelector('#garden');
const orange = document.querySelector('#orange-trigger');
const flowerStory = document.querySelector('#flower-story');
const closeStory = document.querySelector('.close-story');
const dewTrigger = document.querySelector('#dew-trigger');
const library = document.querySelector('#library');
const libraryNote = document.querySelector('#library-note');
const closeLibraryNote = document.querySelector('.close-library-note');
const ledTrigger = document.querySelector('#led-trigger');
const studio = document.querySelector('#studio');
const studioNote = document.querySelector('#studio-note');
const closeStudioNote = document.querySelector('.close-studio-note');
const computerTrigger = document.querySelector('#computer-trigger');
const cloudClassroom = document.querySelector('#cloud-classroom');
const feedbackPanel = document.querySelector('#feedback-panel');
const closeFeedback = document.querySelector('.close-feedback');
const cloudTrigger = document.querySelector('#cloud-trigger');
const planetGreenhouse = document.querySelector('#planet-greenhouse');
const supportPanel = document.querySelector('#support-panel');
const closeSupport = document.querySelector('.close-support');
const greenhouseFlowerTrigger = document.querySelector('#greenhouse-flower-trigger');
const cosmicGarden = document.querySelector('#cosmic-garden');
const cosmicLetterPanel = document.querySelector('#cosmic-letter-panel');
const closeCosmicLetter = document.querySelector('.close-cosmic-letter');
const endingTrigger = document.querySelector('#ending-trigger');
const endingCopy = document.querySelector('#ending-copy');
const restartStory = document.querySelector('#restart-story');
const loaderProgress = document.querySelector('.loader-progress');
const loaderPercent = document.querySelector('#loader-percent');
const bgm = document.querySelector('#bgm');
const musicToggle = document.querySelector('#music-toggle');
let loadingAudioContext;
let loadingSoundPlayed = false;
let loadingCompressor;
let loadingOutput;

const playLoadingTone = (frequency, startAt, duration, gainValue) => {
  if (!loadingAudioContext) return;
  const oscillator = loadingAudioContext.createOscillator();
  const gain = loadingAudioContext.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, startAt);
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.35, startAt + duration);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(gainValue, startAt + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  oscillator.connect(gain).connect(loadingCompressor);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.03);
};

const playLoadingSound = () => {
  if (loadingSoundPlayed) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  loadingAudioContext = loadingAudioContext || new AudioContextClass();
  if (!loadingCompressor) {
    loadingCompressor = loadingAudioContext.createDynamicsCompressor();
    loadingCompressor.threshold.value = -8;
    loadingCompressor.knee.value = 12;
    loadingCompressor.ratio.value = 20;
    loadingCompressor.attack.value = .003;
    loadingCompressor.release.value = .24;
    loadingOutput = loadingAudioContext.createGain();
    loadingOutput.gain.value = .96;
    loadingCompressor.connect(loadingOutput).connect(loadingAudioContext.destination);
  }
  const begin = () => {
    if (loadingSoundPlayed || loadingAudioContext.state !== 'running') return;
    loadingSoundPlayed = true;
    const now = loadingAudioContext.currentTime + 0.04;
    playLoadingTone(523.25, now, .12, 101.64);
    playLoadingTone(659.25, now + .16, .12, 92.4);
    playLoadingTone(783.99, now + .32, .16, 92.4);
    playLoadingTone(1046.5, now + 1.48, .34, 120.12);
  };
  loadingAudioContext.resume().then(begin).catch(() => {});
};

bgm.volume = 0.28;

const syncMusicToggle = () => {
  const isPlaying = !bgm.paused;
  musicToggle.setAttribute('aria-pressed', String(isPlaying));
  musicToggle.setAttribute('aria-label', isPlaying ? '暂停背景音乐' : '播放背景音乐');
  musicToggle.setAttribute('title', isPlaying ? '暂停背景音乐' : '播放背景音乐');
  musicToggle.querySelector('.music-mark').textContent = isPlaying ? 'II' : '>';
  musicToggle.querySelector('.music-label').textContent = isPlaying ? 'BGM ON' : 'BGM OFF';
};

const startBgm = () => bgm.play().then(syncMusicToggle).catch(syncMusicToggle);
startBgm();
const activateExperienceAudio = () => {
  startBgm();
  playLoadingSound();
};
window.addEventListener('pointerdown', activateExperienceAudio, { capture: true, once: true });
window.addEventListener('keydown', activateExperienceAudio, { capture: true, once: true });
loader.addEventListener('pointerdown', activateExperienceAudio, { once: true });
playLoadingSound();

musicToggle.addEventListener('click', () => {
  if (bgm.paused) startBgm();
  else {
    bgm.pause();
    syncMusicToggle();
  }
});

bgm.addEventListener('play', syncMusicToggle);
bgm.addEventListener('pause', syncMusicToggle);

const stories = {
  reason: {
    label: '为什么加入',
    title: '把 AI 变成真正能协作的产品。',
    body: '<p>我加入北辰青年夏季线上实习，想更深入理解 Agent 协作与 AI 产品。</p><p>我享受把模糊需求拆成可执行方案，再把它从 0 做到 1 的过程。</p>'
  },
  projects: {
    label: '已有实践',
    title: '我已经让三个想法开始生长。',
    body: '<p><b>旅游 Agent 平台</b>：导游、路线、翻译、AR 导航、社交内容协同。</p><p><b>WenSi 智能写作</b>：续写、摘要、知识库联动与个性化 Agent。</p><p><b>NoSilence</b>：手语识别、文本整理、语音与个性化训练的 MVP。</p>'
  },
  future: {
    label: '四周之后',
    title: '留下一个能被说清的成果。',
    body: '<p>我期待一段可写进简历的、AI 含量足够高的端到端产品经历。</p><p>Agent 时代仍然需要人：创造力、判断力，以及把协作真正做起来的能力。</p>'
  }
};

const indexStories = {
  strengths: { label: '我能做什么', title: '拆解、表达、执行。', body: '<p>视觉审美与用户观察、需求分析、PPT 结构表达、问题拆解与执行，是我可以直接补位的部分。</p><p>我也会提供情绪支持和创意点子，把想法推进到可运行的项目。</p>' },
  start: { label: '开始之前', title: '先把交付边界说清。', body: '<p>任务需要目标、截止时间、交付类型、标准、参考、背景、负责人、可自由发挥范围和优先级。</p><p>真实需求与创造性表达会驱动我；清楚的规则让我更快进入状态。</p>' },
  blockers: { label: '容易卡住', title: '模糊不是挑战，是成本。', body: '<p>不清楚需求、标准、参考、截止时间，或临近交付才发生大改动，会显著消耗推进效率。</p><p>反馈缺失、优先级冲突、信息分散和交付物不明确，也应该尽早被集中处理。</p>' }
};
const signalStories = {
  brief: { label: '任务怎么给', title: '先给边界，再给空间。', body: '<p>任务最好包含目标、截止时间、交付类型、标准、参考、背景、负责人、可自由发挥范围和优先级。</p><p>不清楚的要求会拖慢推进，集中信息能减少反复确认。</p>' },
  sync: { label: '如何同步', title: '关键依赖，主动同步。', body: '<p>我通常在午夜前更新当天进度；关键依赖和问题会尽早同步。</p><p>强依赖内容需要同一位负责人，复杂且零散的问题适合先整理，再私聊对齐。</p>' },
  feedback: { label: '怎样反馈', title: '反馈要能直接落到下一步。', body: '<p>我希望先拿到方向、标准和参考：什么必须改，什么可选；为什么需要改。</p><p>收到反馈后，我会整理改动、更新同步，并把它记到下一次的检查清单里。</p>' }
};
const feedbackStories = {
  positive:{label:'好的部分',title:'具体肯定，会让我知道什么该保留。',body:'<p>我希望收到具体、可复用的正向反馈，而不是只有“不错”。</p><p>知道哪一步有效，下一次才能继续把它做好。</p>'},
  issues:{label:'需要改什么',title:'说明原因、方向和标准。',body:'<p>问题反馈请尽量包含为什么、改向哪里、参考什么，以及“必须改”和“可选优化”的区别。</p>'},
  after:{label:'收到之后',title:'整理、更新、同步、记下。',body:'<p>收到反馈后，我会整理改动、完成更新、同步结果，并写入下一次的检查清单。</p>'}
};
const supportStories={
  reset:{label:'先恢复节奏',title:'把大任务拆成能启动的小步。',body:'<p>拖延、晚回消息、效率下降时，先拆分小任务、确认优先级，必要时先交初稿或调整时间。</p><p>小里程碑比一次性压满任务更有效。</p>'},
  info:{label:'需要的信息',title:'上下文比催促更有用。',body:'<p>我需要项目背景、目标、受众、参考、评价标准、截止时间和必读材料。</p><p>信息集中、DDL 提前、先初稿再优化，会让我稳定推进。</p>'},
  resources:{label:'可用资源',title:'把资源放到解决问题的地方。',body:'<p>AI 工具、项目文档、课程录屏、案例、专家、参考库和提示词模板，都会显著提高我的效率。</p>'}
};
const letterStories={
  fit:{label:'适合的工作',title:'把复杂问题变成可推进的工作。',body:'<p>我适合需要拆解、AI 辅助开发、PPT 结构表达和 Agent MVP 的工作。</p><p>我有 Codex 与 Cursor 的实践经验，也愿意做功能、代码和 AI 优化的复盘。</p>'},
  needs:{label:'协作需要',title:'清楚、及时、集中。',body:'<p>清晰标准、提前确认优先级、尽早反馈、先初稿再优化，以及集中信息，是我稳定协作的条件。</p><p>高频持续社群聊天不适合我；我更擅长深度专注和单线程推进。</p>'},
  promise:{label:'给团队的话',title:'把四周变成一段值得记住的创作。',body:'<p>在 70 亿人的偶然相遇、30 多人的线上会议里，我会认真参与、学习、接受批评，也贡献创造力与执行。</p><p>希望我们留下回忆，也留下真正让人满意的作品。</p>'}
};

const loaderStartedAt = Date.now();
const loaderDuration = 1720;
const updateLoader = () => {
  const progress = Math.min(100, Math.round(((Date.now() - loaderStartedAt) / loaderDuration) * 100));
  loaderPercent.textContent = progress;
  loaderProgress.setAttribute('aria-valuenow', String(progress));
  if (progress < 100) window.requestAnimationFrame(updateLoader);
};
window.requestAnimationFrame(updateLoader);
window.setTimeout(() => loader.classList.add('is-done'), 1850);

orange.addEventListener('click', () => {
  if (experience.classList.contains('is-transitioning')) return;
  experience.classList.add('is-transitioning');

  window.setTimeout(() => {
    bedroom.classList.remove('is-active');
    bedroom.setAttribute('aria-hidden', 'true');
    garden.classList.add('is-active');
    garden.setAttribute('aria-hidden', 'false');
  }, 690);

  window.setTimeout(() => experience.classList.remove('is-transitioning'), 1540);
});

document.querySelectorAll('.story-flower').forEach((flower) => {
  flower.addEventListener('click', () => {
    const story = stories[flower.dataset.story];
    flowerStory.querySelector('.story-label').textContent = story.label;
    flowerStory.querySelector('h3').textContent = story.title;
    flowerStory.querySelector('.story-body').innerHTML = story.body;
    flowerStory.classList.add('is-open');
    document.querySelectorAll('.story-flower').forEach((item) => item.setAttribute('aria-expanded', String(item === flower)));
  });
});

closeStory.addEventListener('click', () => {
  flowerStory.classList.remove('is-open');
  document.querySelectorAll('.story-flower').forEach((item) => item.setAttribute('aria-expanded', 'false'));
});

dewTrigger.addEventListener('click', () => {
  if (experience.classList.contains('is-dew-transitioning')) return;
  experience.classList.add('is-dew-transitioning');
  window.setTimeout(() => {
    garden.classList.remove('is-active'); garden.setAttribute('aria-hidden', 'true');
    library.classList.add('is-active'); library.setAttribute('aria-hidden', 'false');
  }, 720);
  window.setTimeout(() => experience.classList.remove('is-dew-transitioning'), 1580);
});

document.querySelectorAll('.index-card').forEach((card) => {
  card.addEventListener('click', () => {
    const story = indexStories[card.dataset.index];
    libraryNote.querySelector('.library-note-label').textContent = story.label;
    libraryNote.querySelector('h3').textContent = story.title;
    libraryNote.querySelector('.library-note-body').innerHTML = story.body;
    libraryNote.classList.add('is-open');
    document.querySelectorAll('.index-card').forEach((item) => item.setAttribute('aria-expanded', String(item === card)));
  });
});
closeLibraryNote.addEventListener('click', () => {
  libraryNote.classList.remove('is-open');
  document.querySelectorAll('.index-card').forEach((item) => item.setAttribute('aria-expanded', 'false'));
});

ledTrigger.addEventListener('click', () => {
  if (experience.classList.contains('is-led-transitioning')) return;
  experience.classList.add('is-led-transitioning');
  window.setTimeout(() => { library.classList.remove('is-active'); library.setAttribute('aria-hidden', 'true'); studio.classList.add('is-active'); studio.setAttribute('aria-hidden', 'false'); }, 620);
  window.setTimeout(() => experience.classList.remove('is-led-transitioning'), 1320);
});
document.querySelectorAll('.signal-note').forEach((note) => {
  note.addEventListener('click', () => { const story = signalStories[note.dataset.signal]; studioNote.querySelector('.studio-note-label').textContent = story.label; studioNote.querySelector('h3').textContent = story.title; studioNote.querySelector('.studio-note-body').innerHTML = story.body; studioNote.classList.add('is-open'); });
});
closeStudioNote.addEventListener('click', () => studioNote.classList.remove('is-open'));
computerTrigger.addEventListener('click',()=>{if(experience.classList.contains('is-screen-transitioning'))return;experience.classList.add('is-screen-transitioning');window.setTimeout(()=>{studio.classList.remove('is-active');studio.setAttribute('aria-hidden','true');cloudClassroom.classList.add('is-active');cloudClassroom.setAttribute('aria-hidden','false');},620);window.setTimeout(()=>experience.classList.remove('is-screen-transitioning'),1370);});
document.querySelectorAll('.feedback-note').forEach((note)=>note.addEventListener('click',()=>{const story=feedbackStories[note.dataset.feedback];feedbackPanel.querySelector('.feedback-label').textContent=story.label;feedbackPanel.querySelector('h3').textContent=story.title;feedbackPanel.querySelector('.feedback-body').innerHTML=story.body;feedbackPanel.classList.add('is-open');}));
closeFeedback.addEventListener('click',()=>feedbackPanel.classList.remove('is-open'));
cloudTrigger.addEventListener('click',()=>{if(experience.classList.contains('is-cloud-transitioning'))return;experience.classList.add('is-cloud-transitioning');window.setTimeout(()=>{cloudClassroom.classList.remove('is-active');cloudClassroom.setAttribute('aria-hidden','true');planetGreenhouse.classList.add('is-active');planetGreenhouse.setAttribute('aria-hidden','false');},680);window.setTimeout(()=>experience.classList.remove('is-cloud-transitioning'),1480);});
document.querySelectorAll('.support-planet').forEach((planet)=>planet.addEventListener('click',()=>{const story=supportStories[planet.dataset.support];supportPanel.querySelector('.support-label').textContent=story.label;supportPanel.querySelector('h3').textContent=story.title;supportPanel.querySelector('.support-body').innerHTML=story.body;supportPanel.classList.add('is-open');}));
closeSupport.addEventListener('click',()=>supportPanel.classList.remove('is-open'));
greenhouseFlowerTrigger.addEventListener('click',()=>{if(experience.classList.contains('is-flower-transitioning'))return;experience.classList.add('is-flower-transitioning');window.setTimeout(()=>{planetGreenhouse.classList.remove('is-active');planetGreenhouse.setAttribute('aria-hidden','true');cosmicGarden.classList.add('is-active');cosmicGarden.setAttribute('aria-hidden','false');},660);window.setTimeout(()=>experience.classList.remove('is-flower-transitioning'),1460);});
document.querySelectorAll('.space-letter').forEach((letter)=>letter.addEventListener('click',()=>{const story=letterStories[letter.dataset.letter];cosmicLetterPanel.querySelector('.cosmic-letter-label').textContent=story.label;cosmicLetterPanel.querySelector('h3').textContent=story.title;cosmicLetterPanel.querySelector('.cosmic-letter-body').innerHTML=story.body;cosmicLetterPanel.classList.add('is-open');}));
closeCosmicLetter.addEventListener('click',()=>cosmicLetterPanel.classList.remove('is-open'));
endingTrigger.addEventListener('click',()=>{cosmicLetterPanel.classList.remove('is-open');cosmicGarden.classList.add('is-ending');window.setTimeout(()=>endingCopy.classList.add('is-open'),960);});
restartStory.addEventListener('click',()=>window.location.reload());
