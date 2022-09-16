const btn = document.querySelector('.changeColorBtn');
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
const response = document.getElementById("response");
const h1 = document.querySelector('.h1');
const h2 = document.querySelector('.h2');
const h3 = document.querySelector('.h3');
const h4 = document.querySelector('.h4');
const h5 = document.querySelector('.h5');
const h6 = document.querySelector('.h6');



btn.addEventListener('click', async (h2) => {
    chrome.storage.sync.get('color', ({ color }) => {
        console.log('color: ', color);
    });
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: runScript,
            // args: [h2]
        },
        async (injectionResults) => {
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

                let url = data.result.url;
                const robo = robot.innerHTML = `${url}/robots.txt`;
                robot.href = robo;

                let URI = `${url}/sitemap_index.xml`
                map.innerHTML = URI;
                map.href = URI;

                const responseAll = data.result.statusCode;
                response.innerHTML = `${responseAll} OK `;

                let head1 = data.result.firstHead;
                h1.innerHTML = head1;

                let head2 = data.result.h2Text;
                h2.innerHTML = head2;

                let head3 = data.result.h3Text;
                h3.innerHTML = head3;

                let head4 = data.result.h4Text;
                h4.innerHTML = head4;

                let head5 = data.result.h5Text;
                h5.innerHTML = head5;

                let head6 = data.result.h6Text;
                h6.innerHTML = head6;



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

        let allLinks = [...document.images];

        console.log(allLinks);

        const response = await fetch(window.location.href);
        let statusCode = response.status;

        let h1Text = [...document.getElementsByTagName('h1')];

        const head1 = [];

        for (let i = 0; i < h1Text.length; i++) {
            head1.push(h1Text[i]);
            // console.log(head1);
        }
        console.log(head1);



        let h2Text = [...document.getElementsByTagName('h2')];
        let h3Text = [...document.getElementsByTagName('h3')];
        let h4Text = [...document.getElementsByTagName('h4')];
        let h5Text = [...document.getElementsByTagName('h5')];
        let h6Text = [...document.getElementsByTagName('h6')];
        // console.log(h3Text);
        // console.log(h4Text);
        // console.log(h5Text);
        // console.log(h6Text);


        return { totalCount, title, description, titleLength, descLength, location, url, allLinks, statusCode, h1Text, h2Text, h3Text, h4Text, h5Text, h6Text };
    } catch (err) {
        console.error(err);
    }
}
