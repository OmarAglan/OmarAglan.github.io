/*==================== PORTFOLIO MODAL ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // Get modal elements
    const modal = document.getElementById('portfolio-modal');
    const modalClose = document.getElementById('portfolio-modal-close');
    const modalTitle = document.querySelector('.portfolio-modal__title');
    const modalImg = document.getElementById('portfolio-modal-img');
    const modalDescription = document.getElementById('portfolio-modal-description');
    const modalTechnologies = document.getElementById('portfolio-modal-technologies');
    const modalDemo = document.getElementById('portfolio-modal-demo');
    const modalSource = document.getElementById('portfolio-modal-source');
    
    // Get all portfolio sections
    const portfolioSections = document.querySelectorAll('.portfolio-sections__container .portfolio.section');
    
    // Function to open modal with project data
    function openModal(projectData) {
        // Set modal content
        modalTitle.textContent = projectData.title;
        modalImg.src = projectData.image;
        modalImg.alt = projectData.title;
        
        // Handle multiline description with proper formatting
        modalDescription.innerHTML = projectData.description
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => `<p>${line}</p>`)
            .join('');
        
        // Clear existing technology tags
        modalTechnologies.innerHTML = '';
        
        // Add technology tags
        projectData.technologies.forEach(tech => {
            if (tech.trim() === '') return;
            const techTag = document.createElement('span');
            techTag.classList.add('portfolio-modal__tech-tag');
            techTag.textContent = tech;
            modalTechnologies.appendChild(techTag);
        });
        
        // Set links
        if (projectData.demoLink && projectData.demoLink !== '#') {
            modalDemo.href = projectData.demoLink;
            modalDemo.style.display = 'inline-flex';
        } else {
            modalDemo.style.display = 'none';
        }
        
        if (projectData.sourceLink && projectData.sourceLink !== '#') {
            modalSource.href = projectData.sourceLink;
            modalSource.style.display = 'inline-flex';
        } else {
            modalSource.style.display = 'none';
        }
        
        // Show modal with animation
        requestAnimationFrame(() => {
            modal.classList.add('active-modal');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    }
    
    // Function to close modal
    function closeModal() {
        modal.classList.remove('active-modal');
        
        // Reset modal content after animation completes
        setTimeout(() => {
            modalImg.src = '';
            modalTechnologies.innerHTML = '';
            document.body.style.overflow = ''; // Restore scrolling
        }, 300); // Match the transition duration
    }
    
    // Add click event to close button
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active-modal')) {
            closeModal();
        }
    });
    
    // Helper function to check if an element is a swiper control
    function isSwiperControl(element) {
        return element.closest('.swiper-button-next') || 
               element.closest('.swiper-button-prev') ||
               element.closest('.swiper-pagination') ||
               element.closest('.swiper-scrollbar') ||
               element.classList.contains('swiper-button-next') ||
               element.classList.contains('swiper-button-prev') ||
               element.classList.contains('swiper-pagination-bullet');
    }
    
    // Add click event to each portfolio content directly
    document.querySelectorAll('.portfolio-sections__container .portfolio__content').forEach(content => {
        content.addEventListener('click', (e) => {
            // Prevent clicks on buttons, links, or swiper navigation from opening the modal
            if (e.target.closest('a') || 
                e.target.closest('button') || 
                isSwiperControl(e.target)) {
                return;
            }
            
            // Get the section this content belongs to
            const section = content.closest('.portfolio.section');
            if (!section) return;
            
            // Get section title and subtitle
            const sectionTitle = section.querySelector('.section__title').textContent;
            const sectionSubtitle = section.querySelector('.section__subtitle')?.textContent || '';
            
            // Get project-specific data
            const projectTitle = content.querySelector('.portfolio__title');
            const projectDescription = content.querySelector('.portfolio__description');
            const imgElement = content.querySelector('.portfolio__img');
            
            // Build description
            let description = '';
            
            // Add project title if available
            if (projectTitle) {
                description = projectTitle.textContent + '\n\n';
            }
            
            // Add section subtitle if available
            if (sectionSubtitle) {
                description += sectionSubtitle + '\n\n';
            }
            
            // Add project description if available
            if (projectDescription) {
                description += projectDescription.textContent;
            }
            
            // Get technologies
            const technologies = [];
            const techTags = content.querySelectorAll('.portfolio__tech-tag');
            techTags.forEach(tag => {
                technologies.push(tag.textContent.trim());
            });
            
            // Get links
            let demoLink = '';
            let sourceLink = '';
            
            const buttons = content.querySelectorAll('.portfolio__button');
            if (buttons.length > 0) {
                demoLink = buttons[0].href;
                if (buttons.length > 1) {
                    sourceLink = buttons[1].href;
                }
            }
            
            // Get image
            const image = imgElement ? imgElement.src : '';
            
            // Open modal with project data
            openModal({
                title: projectTitle ? projectTitle.textContent : sectionTitle,
                image,
                description,
                technologies,
                demoLink,
                sourceLink
            });
            
            // Prevent event from bubbling up
            e.stopPropagation();
        });
    });
    
    // Add event listeners to swiper controls to prevent modal opening
    document.querySelectorAll('.swiper-button-next, .swiper-button-prev, .swiper-pagination').forEach(control => {
        control.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
    
    // Keep the section click handler as a fallback, but make it less aggressive
    portfolioSections.forEach(section => {
        section.addEventListener('click', (e) => {
            // Only proceed if the click was directly on the section (not on a portfolio__content or its children)
            if (e.target.closest('.portfolio__content') || 
                e.target.closest('a') || 
                e.target.closest('button') || 
                isSwiperControl(e.target)) {
                return;
            }
            
            // Get the first portfolio content in this section as fallback
            const firstContent = section.querySelector('.portfolio__content');
            if (!firstContent) return;
            
            // Simulate a click on the first content
            firstContent.click();
        });
    });
}); 