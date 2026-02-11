// Dynamic content loader with embedded content
document.addEventListener('DOMContentLoaded', function() {
    // Embedded content from txt files
    const contentData = {
        'introduction-content': {
            static: 'Why schould schools care?',
            dynamic: 'There are many reasons why schools should take cybersecurity seriously. If the school gets DDOSed then no work depending on internet conectivity will be done. The information of students being leaked is very bad for public perception. If the infromation of staff member gets leaked then the chances of someone wanting to work at the school in question go down. If an account of a student/staff member gets hacked then the account can be used to cause further damage. Including but not limited to: full access to all information on students and staff, changing the code behind related websites, and damage to hardware.'
        },
        'confirmation-bias-content': {
            text: 'Most children don\'t even know how networking works. How could they possibly do anything listed above? Cybersecurity is about stoping bad actors regardless of age from interfering from the daily operation.\n\nA strong password will stop any threat.\nAs computers grow more and more powerfull with every passing year it has become more viable to use "brute force password cracking". Which is the act is breaking passwords by guessing the password. Which is why mesures like passkeys and 2 factor athentication have bcome more populare in recent years.\n\nCybersecurity costs more then it\'s worth.\nDamage to even 5 SSDs is more money then the price of 1 cybersecurity auditor highered to prevent such damage.\n\nThe school I worked for never got hacked so I shouldn\'t care.\nEverything that can go wron will go wrong given enough time.'
        },
        'optimism-bias-content': {
            text: '1) Never relly on one security solution. It is like trying to prevent a bank robbery by having only locked doors.\n2) Do not use obscure software. The more obscure the software is the more likely it has security issues the developers are unaware of.\n3) Train school staff to not trust any emails (or any other forms of communication) by default.\n4) Reduce the software footprint. Software may have flaws that allow for normal user to run in admin mode and as a result download malware.\n5) Do not provide devices/users with more rights then the bare minimum to get work done.\n6) Isolate devices from each other on the network based on who needs access to them. Such that student computers can not interact with server computers.\n7) Do not connect devices to the network unless they need it for operation. Printers that are intended for the secretary to use should not need internet access if it is already connected to the pc via usb.\n8) Password protect the BIOS/EUFI of devices. This will prevent bad actors from being able to boot an OS from a usb drive which cercomvents most secretary mesures.'
        },
        'examples-content': {
            text: 'Yet another exmaple of how a optimism bias could effect actions is an employee storing all work related passwords in an unencrypted txt file in the desktop folder named passwords.txt. When asked the employee responds with "I am not even a server admin what could possibly go wrong if I get hacked". Unaware that the account(s) will be used to send out phishing emails or probe for other holes in the protections inplace. Such as checking for accounts being given more rights then needed. Leading to a lot of time waisted for the cyber security department.'
        },
        'solutions-content': {
            text: 'The best way to deal with any bias in cyber security that can scew the judgement of an expert in the field is to remember the war between security and hacking is not a match of league of legends. It is a continues never ending war. Not a one of event totally isolated form the rest of the world. Undescovered hardware vualnrabilities may be inside all the hardware the organization makes use of.\n\nA war has many fronts and just beacuse the software front is "100% secure" does not mean every front is. Physical security is also a factor as what a bad actor with physical acess to a machine skyrockets. Humans are not perfect cretures and we all make mistakes eventually. A server admin acidentally forgetting to disable the root account in a l/unix server could be disasterous as the root user has FULL UNIMITGATED access to the entire system.\n\nThis is why to reduce the strnaglehold that biases can have over your choices in the workplace one should:\n1) Not to be afraid of being wrong.\n2) Avoid partaking in/creating echo chambers.\n3) Should be ok with concepts they are familuar with becoming outdated/deprecated.\n4) Be open to other\'s perspectives/solutions.\n5) Design systems with human error in mind.\n6) Go of tests not just past experiance.\n7) Seak out constructive & good fath arguments with peopl of oposing/conflicting views.\n8) Stay in touch with cyber security news.\n9) Inform others on how them lacking security effects others in the workplace.\n10) Treat no source as the objective truth. The turth often has hidden conditions for it to be "true".\n11) Humans are not without flaws and thus can not make flawless things.'
        },
        'sources-content': {
            text: 'Sources:\nCrouse, M. (n.d.). Software makers encouraged to stop using C/C++ by 2026. techrepublic.\nhttps://www.techrepublic.com/article/cisa-fbi-memory-safety-recommendations/\n\nAlnifie, K. M., & Kim, C. (2023, February 23). Appraising the manifestation of optimism bias and its impact on human perception of cyber security a meta analysis. SCIRP. https://www.scirp.org/journal/paperinformation?paperid=123196\n\nBertrand. (2025, November 5). Neuroscience and cybersecurity: Understanding cognitive biases. Hardis Group.\nhttps://www.hardis-group.com/en/blog/neuroscience-and-cybersecurity-defeating-cognitive-biases-to-reduce-human-error/\n\nEling, M., & Jung, K. (2025). Optimism bias and its impact on cyber risk management decisions. ScienceDirect.\nhttps://www.sciencedirect.com/science/article/pii/S2950629824000018'
        }
    };

    // Fixed image files for each section
    const sectionImages = {
        'introduction-content': '1.jpg',
        'confirmation-bias-content': '3.jpg',
        'optimism-bias-content': '4-2.jpg',
        'examples-content': '5.jpg',
        'solutions-content': '6.png'
    };

    // Load content for each section
    for (const [containerId, content] of Object.entries(contentData)) {
        const container = document.getElementById(containerId);
        if (!container) continue;

        const section = container.closest('section');
        const header = section ? section.querySelector('h2') : null;

        // Clear the "Loading content..." text
        container.innerHTML = '';

        // For introduction-content, add both static and dynamic text
        if (containerId === 'introduction-content' && content.static && content.dynamic) {
            const staticText = document.createElement('div');
            staticText.className = 'loaded-text';
            staticText.innerHTML = `<p>${content.static}</p>`;
            container.appendChild(staticText);

            const dynamicText = document.createElement('div');
            dynamicText.className = 'loaded-text';
            const formattedText = content.dynamic.replace(/\n/g, '<br>');
            dynamicText.innerHTML = `<p>${formattedText}</p>`;
            container.appendChild(dynamicText);
        } else if (content.text) {
            // For all other sections, add the text
            const textElement = document.createElement('div');
            textElement.className = 'loaded-text';
            const formattedText = content.text.replace(/\n/g, '<br>');
            textElement.innerHTML = `<p>${formattedText}</p>`;
            container.appendChild(textElement);
        }

        // Add image if this section has one
        if (sectionImages[containerId] && header) {
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