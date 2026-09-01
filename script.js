const header=document.querySelector('[data-header]');
const menuButton=document.querySelector('[data-menu]');
const mobileMenu=document.querySelector('[data-mobile]');
const closeMenu=()=>{header.classList.remove('open');document.body.classList.remove('menu-open');menuButton.setAttribute('aria-expanded','false')};
menuButton.addEventListener('click',()=>{const open=!header.classList.contains('open');header.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);menuButton.setAttribute('aria-expanded',String(open))});
mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>20),{passive:true});
document.querySelector('[data-year]').textContent=new Date().getFullYear();
const GOOGLE_REVIEW_COUNT=24;
document.querySelectorAll('[data-google-review-count]').forEach(item=>item.textContent=GOOGLE_REVIEW_COUNT);

const serviceSelect=document.querySelector('[data-service-select]');
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{const option=[...serviceSelect.options].find(item=>item.value===link.dataset.service||item.text===link.dataset.service);if(option)serviceSelect.value=option.value}));

const filterButtons=document.querySelectorAll('[data-filter]');
const galleryItems=document.querySelectorAll('.gallery-item');
filterButtons.forEach(button=>button.addEventListener('click',()=>{filterButtons.forEach(item=>item.classList.remove('active'));button.classList.add('active');galleryItems.forEach(item=>item.hidden=button.dataset.filter!=='all'&&!item.dataset.category.split(' ').includes(button.dataset.filter))}));

const lightbox=document.querySelector('[data-lightbox]');
const lightboxImage=lightbox.querySelector('img');
const lightboxCaption=lightbox.querySelector('p');
galleryItems.forEach(item=>item.addEventListener('click',()=>{lightboxImage.src=item.dataset.image;lightboxImage.alt=item.querySelector('img').alt;lightboxCaption.textContent=item.dataset.caption;lightbox.showModal()}));
lightbox.querySelector('[data-close]').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close()});

const form=document.querySelector('[data-form]');
const status=document.querySelector('[data-status]');
form.addEventListener('submit',async event=>{event.preventDefault();const submit=form.querySelector('button[type="submit"]');submit.disabled=true;submit.textContent='Sending…';status.textContent='';try{const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});if(!response.ok)throw new Error('Submission failed');form.reset();status.textContent='Thanks — your request was sent. ProSleek will follow up shortly.'}catch{status.textContent='We could not send that request. Please call or text (515) 865-9759.'}finally{submit.disabled=false;submit.textContent='Send quote request'}});
