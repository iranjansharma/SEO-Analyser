const btn = document.querySelector('.changeColorBtn');
const h2 = document.querySelector('.h2').innerText;
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');
const count = document.querySelector('.count');
const title = document.querySelector('.title');
const desc = document.querySelector('.desc');
const titleVal = document.querySelector('.titleVal');
const descLength = document.querySelector('.descLength');
const URL = document.querySelector('.URL');
const Can_URL = document.getElementById("link");
const robot = document.getElementById("robot");
const map = document.getElementById("map");



btn.addEventListener('click', async (h2) => {
    chrome.storage.sync.get('color', ({ color }) => {
        console.log('color: ', color);
    });
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: runScript,
            args: [h2]
        },
        async (injectionResults) => {
            console.log(injectionResults);
            const [data] = injectionResults;
            if (data.result) {
                const totalCount = data.result.totalCount;
                count.innerHTML = totalCount;
                // colorGrid.style.backgroundColor = color;
                const metaTitle = data.result.titleLength;
                titleVal.innerHTML = metaTitle;
                // colorValue.innerText = color;
                const Title = data.result.title;
                title.innerHTML = Title;

                const Description = data.result.description;
                desc.innerHTML = Description;

                const descriptionLength = data.result.descLength;
                descLength.innerHTML = descriptionLength;

                const location = data.result.location;
                URL.innerHTML = location;
                URL.href = location;

                Can_URL.innerHTML = location;
                Can_URL.href = location;

                const robo = robot.innerHTML = `${location}robots.txt`;
                robot.href = robo;

                let url = data.result.url;
                let URI = `${url}/sitemap_index.xml`
                map.innerHTML = URI;
                map.href = URI;

                try {
                    // await navigator.clipboard.writeText(color);
                } catch (err) {
                    console.error(err);
                }
            }
        }
    );
});


async function runScript() {
    try {
        let totalText = document.body.innerText;
        let cleanData = totalText.replace(/\s/g, '');
        let totalCount = cleanData.length;

        const title = document.title;
        let titleLength = title.length;

        const description = document.querySelector('[name=description]').content;
        let descLength;
        if (description !== null) {
            descLength = description.length;
        } else {
            descLength = 1;
        }

        const location = window.location.href;

        let url = window.location.origin;

        let allLinks = document.images;

        console.log(allLinks);


        return { totalCount, title, description, titleLength, descLength, location, url };
    } catch (err) {
        console.error(err);
    }
}
