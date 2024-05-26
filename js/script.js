

// ================================= tab functionality =====================================

// Add event listener to menu items to close the side menu on mobile
document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll('.nav-btn');
    const menuCheckbox = document.getElementById('menu');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            showContent(targetTab);

            // Close the side menu if on mobile
            if (window.innerWidth <= 991) {
                menuCheckbox.checked = false;
            }
        });
    });
});

function showContent(tabName) {
    const allTabs = document.querySelectorAll('.content-container');
    allTabs.forEach(tab => {
        tab.classList.remove('show');
        tab.classList.add('hide');
    });

    const targetTab = document.querySelector(`.content-container[data-tab="${tabName}"]`);
    targetTab.classList.remove('hide');
    targetTab.classList.add('show');

    const activeTab = document.querySelector('.nav-btn.active');
    activeTab.classList.remove('active');

    const newActiveTab = document.querySelector(`.nav-btn[data-tab="${tabName}"]`);
    newActiveTab.classList.add('active');
}


//============================== Home page load animation =============================================

// Wrap your animation logic inside a function to ensure it runs after the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Select the element to animate
    const typingElement = document.querySelector('.title h1');
    const nameText = "Tharika Wanniarachchi";

    // Function to simulate typing effect
    function typeWriter(text, element, speed) {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);
    }

    // Start typing animation for the name when the page is loaded
    typeWriter(nameText, typingElement, 100); // Change speed as needed

    
});


//============================== skill bar=============================================
(function() {
    var SkillsBar = function( bars ) {
        this.bars = document.querySelectorAll( bars );
        if( this.bars.length > 0 ) {
            this.init();
        } 
    };
    
    SkillsBar.prototype = {
        init: function() {
            // Function to initialize the SkillsBar
            var self = this;
            self.index = -1;
            self.timer = setTimeout(function() {
                self.action();
            }, 500);
        },
        select: function( n ) {
            // Function to select a particular skill bar
            var self = this,
                bar = self.bars[n];
            
            if( bar ) {
                var width = bar.parentNode.dataset.percent;
                bar.style.width = width;
                bar.parentNode.classList.add( "complete" ); 
            }
        },
        action: function() {
            // Function to execute the animation action
            var self = this;
            self.index++;
            if( self.index == self.bars.length ) {
                clearTimeout( self.timer );
            } else {
                self.select( self.index );  
            }
            setTimeout(function() {
                self.action();
            },500);
        }
    };
    
    window.SkillsBar = SkillsBar;
    
    // Function to initialize SkillsBar after clicking the "Skills" tab
    function initSkillsBar() {
        var skills = new SkillsBar( ".skillbar-bar" );
    }

    // Event listener for the "Skills" tab
    document.querySelector('[data-tab="skills"]').addEventListener('click', initSkillsBar);
})();




//===============Portfolio slider ====================

const indicators = document.querySelectorAll('.portfolioSlider .indicators .indicator')
        const arrowPrev = document.querySelector('.portfolioSlider .arrows .arrow-prev')
        const arrowNext = document.querySelector('.portfolioSlider .arrows .arrow-next')

        const handleIndicatorClick = (event) => {
        const indicator = event.target
        if (!isActive(indicator)) {
            removeActive()
            addActive(indicator)
            showSlide(indicator.dataset.slide)
        }
        }

        const handlePrevArrowClick = (event) => {
        let activeSlide = 0
        let newActiveSlide = indicators.length
        let ready = false

        indicators.forEach(indicator => {
            if (isActive(indicator) && !ready) {
            activeSlide = indicator.dataset.slide
            if (activeSlide !== '1') {
                newActiveSlide = parseInt(activeSlide) - 1
            }
            removeActive()
            addActive(document.querySelector(`.portfolioSlider .indicators [data-slide='${newActiveSlide}']`))
            showSlide(newActiveSlide)
            ready = true
            }
        })
        }

        const handleNextArrowClick = (event) => {
        let activeSlide = 0
        let newActiveSlide = 1
        let ready = false

        indicators.forEach(indicator => {
            if (isActive(indicator) && !ready) {
            activeSlide = indicator.dataset.slide
            if (activeSlide !== indicators.length.toString()) {
                newActiveSlide = parseInt(activeSlide) + 1
            }
            removeActive()
            addActive(document.querySelector(`.portfolioSlider .indicators [data-slide='${newActiveSlide}']`))
            showSlide(newActiveSlide)
            ready = true
            }
        })
        }

        indicators.forEach(indicator => {
        indicator.addEventListener('click', handleIndicatorClick)
        })

        arrowPrev.addEventListener('click', handlePrevArrowClick)
        arrowNext.addEventListener('click', handleNextArrowClick)

        function isActive (indicator) {
        return indicator.hasAttribute('active')
        }

        function removeActive () {
        document.querySelectorAll('.portfolioSlider .indicators [active]').forEach(item => {
            item.removeAttribute('active')
        })
        }

        function addActive (indicator) {
        indicator.setAttribute('active', '')
        }

        function showSlide (newActiveSlide) {
        const newPosition = (100 * (newActiveSlide - 1)).toString()
        document.querySelector('.portfolioSlider-inner').style.marginLeft = `-${newPosition}%`
        }
