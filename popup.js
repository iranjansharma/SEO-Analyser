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
const h1 = document.getElementById('h1');
const h2 = document.getElementById('h2');
const h3 = document.getElementById('h3');
const h4 = document.getElementById('h4');
const h5 = document.getElementById('h5');
const h6 = document.getElementById('h6');
const img = document.getElementById('img');



btn.addEventListener('click', async (h2) => {
    chrome.storage.sync.get('color', ({ color }) => {
        console.log('color: ', color);
    });
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: runScript,
        },
        async (injectionResults) => {
            const [data] = injectionResults;
            console.log(data);
            if (data.result) {
                const totalCount = data.result.totalCount;
                count.innerHTML = totalCount;
                const metaTitle = data.result.titleLength;
                titleVal.innerHTML = metaTitle;
                const Title = data.result.title;
                title.innerHTML = Title;
                const Description = data.result.description;
                desc.innerHTML = Description ? Description : "This Website Has No Meta Description";
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

                let head1 = data.result.head1;
                console.log(head1);

                head1.map((element, index) => {
                    const node = document.createElement("h1");
                    const textnode = document.createTextNode(`${index} : ${element}  ,--H1`);
                    node.appendChild(textnode);
                    h1.appendChild(node);
                });

                let head2 = data.result.head2;
                console.log(head2);

                head2.map((element, index) => {
                    const node = document.createElement("h2");
                    const textnode = document.createTextNode(`${index} : ${element}  ,--H2`);
                    node.appendChild(textnode);
                    h1.appendChild(node);
                });


                let head3 = data.result.head3;
                head3.map((element, index) => {
                    const node = document.createElement("h3");
                    const textnode = document.createTextNode(`${index} : ${element}  ,--H3`);
                    node.appendChild(textnode);
                    h3.appendChild(node);
                });

                let head4 = data.result.head4;
                head4.map((element, index) => {
                    const node = document.createElement("h4");
                    const textnode = document.createTextNode(`${index} : ${element}  ,--H4`);
                    node.appendChild(textnode);
                    h4.appendChild(node);
                });


                let head5 = data.result.head5;
                head5.map((element, index) => {
                    const node = document.createElement("h5");
                    const textnode = document.createTextNode(`${index} : ${element}  ,--H5`);
                    node.appendChild(textnode);
                    h5.appendChild(node);
                });


                let head6 = data.result.head6;
                head6.map((element, index) => {
                    const node = document.createElement("h6");
                    const textnode = document.createTextNode(`${index} : ${element}  ,--H6`);
                    node.appendChild(textnode);
                    h6.appendChild(node);
                });

                let imgLink = data.result.allImgLinks;
                imgLink.map((element, index) => {
                    const node = document.createElement("a");
                    const textnode = document.createTextNode(`${index} : ${element}    `);
                    node.href = `${element}`;
                    node.setAttribute("class", "anchors");
                    node.appendChild(textnode);
                    img.appendChild(node);
                });
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

        const description = document.querySelector('[name=description]')?.content;

        let descLength;
        if (description) {
            descLength = description?.length;
        } else {
            descLength = 1;
        }

        const location = window.location.href;

        let url = window.location.origin;

        const response = await fetch(window.location.href);
        let statusCode = response.status;

        let h1Text = [...document.getElementsByTagName('h1')];
        const head1 = [];

        for (let i = 0; i < h1Text.length; i++) {
            head1.push(h1Text[i]?.innerText);
        };


        let h2Text = [...document.getElementsByTagName('h2')];
        let head2 = []
        for (let i = 0; i < h2Text.length; i++) {
            head2.push(h2Text[i]?.innerText);
        }

        let h3Text = [...document.getElementsByTagName('h3')];
        let head3 = []
        for (let i = 0; i < h2Text.length; i++) {
            head3.push(h2Text[i]?.innerText);
        }

        let h4Text = [...document.getElementsByTagName('h4')];
        let head4 = []
        for (let i = 0; i < h2Text.length; i++) {
            head4.push(h2Text[i]?.innerText);
        }

        let h5Text = [...document.getElementsByTagName('h5')];
        let head5 = []
        for (let i = 0; i < h2Text.length; i++) {
            head2.push(h2Text[i]?.innerText);
        }

        let h6Text = [...document.getElementsByTagName('h6')];
        let head6 = []
        for (let i = 0; i < h2Text.length; i++) {
            head2.push(h2Text[i]?.innerText);
        }

        let imgLinks = [...document.images];
        let allImgLinks = []

        for (let i = 0; i < imgLinks.length; i++) {
            allImgLinks.push(imgLinks[i]?.currentSrc);
        }
        console.log(allImgLinks);

        return { totalCount, title, description, titleLength, descLength, location, url, allImgLinks, head1, statusCode, head2, head3, head4, head5, head6 };
    } catch (err) {
        console.error(err);
    }
}
