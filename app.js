// Dynamic content loader from txt files
document.addEventListener('DOMContentLoaded', async function() {
    // Static first text for introduction
    const staticIntroductionText = 'Why schould schools care?';
    
    // Mapping of content containers to their txt files
    const contentFileMapping = {
        'introduction-content': '1.txt',
        'confirmation-bias-content': '3.txt',
        'optimism-bias-content': '4.txt',
        'examples-content': '5.txt',
        'solutions-content': '6.txt',
        'sources-content': '7.txt'
    };

    // Fixed image files for each section
    const sectionImages = {
        'introduction-content': '1.jpg',
        'confirmation-bias-content': '3.jpg',
        'optimism-bias-content': '4-2.jpg',
        'examples-content': '5.jpg',
        'solutions-content': '6.png'
    };

    // Function to fetch text file content (with cache-busting)
    async function fetchTextFile(filename) {
        try {
            // Append a cache-busting query param so CDN/edge caches return fresh content
            const url = `${filename}?_=${Date.now()}`;
            const response = await fetch(url, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`Failed to load ${filename} (status ${response.status})`);
            }
            return await response.text();
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            return '';
        }
    }

    // Load content for each section
    for (const [containerId, filename] of Object.entries(contentFileMapping)) {
        const container = document.getElementById(containerId);
        const section = container.closest('section');
        const header = section.querySelector('h2');

        // Clear the "Loading content..." text
        container.innerHTML = '';

        // Fetch the text file content
        const fileContent = await fetchTextFile(filename);

        // For introduction-content, add the static first text
        if (containerId === 'introduction-content') {
            const staticText = document.createElement('div');
            staticText.className = 'loaded-text';
            staticText.innerHTML = `<p>${staticIntroductionText}</p>`;
            container.appendChild(staticText);
        }

        // Add the dynamically loaded text
        if (fileContent) {
            const textElement = document.createElement('div');
            textElement.className = 'loaded-text';
            // Convert newlines to <br> tags for proper formatting
            const formattedText = fileContent.replace(/\n/g, '<br>').trim();
            textElement.innerHTML = `<p>${formattedText}</p>`;
            container.appendChild(textElement);
        }

        // Add image if this section has one
        if (sectionImages[containerId]) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'image-container';
            imgContainer.innerHTML = `
                <img src="${sectionImages[containerId]}" alt="${sectionImages[containerId]}">
            `;
            header.appendChild(imgContainer);
        }
    }

    // Add the original source to the sources section (after the content from 7.txt)
    const sourcesContainer = document.getElementById('sources-content');
    const originalSource = document.createElement('p');
    originalSource.textContent = 'Crouse, M. (n.d.). Software makers encouraged to stop using C/C++ by 2026. techrepublic. https://www.techrepublic.com/article/cisa-fbi-memory-safety-recommendations/';
    sourcesContainer.appendChild(originalSource);

    // Smooth scrolling for navigation links
    document.querySelectorAll('.sidebar nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 20, // Small offset for better positioning
                behavior: 'smooth'
            });
        });
    });

    // Add active class to navigation links when scrolling to sections
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.sidebar nav ul li a');

        let current = '';

        // Calculate the current section based on scroll position
        const scrollPosition = window.scrollY + 100; // Offset to account for header

        // Special handling for the last section (Sources)
        const lastSection = sections[sections.length - 1];
        const lastSectionTop = lastSection.offsetTop;
        const lastSectionHeight = lastSection.offsetHeight;
        const lastSectionId = lastSection.getAttribute('id');

        // Check if we're near the bottom of the page (for the last section)
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );

        const windowHeight = window.innerHeight;

        // If we're scrolled near the bottom of the page, highlight the last section
        if ((scrollPosition + windowHeight) >= (documentHeight - 100)) {
            current = lastSectionId;
        } else {
            // For other sections, use the original logic
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                // Check if scroll position is within the current section
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = sectionId;
                }
            });
        }

        // Update active class on navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Show images when page loads
    setTimeout(function() {
        const imageContainers = document.querySelectorAll('.image-container');
        imageContainers.forEach(imgContainer => {
            imgContainer.classList.add('visible');
        });
    }, 100);
});