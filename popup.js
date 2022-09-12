const btn = document.querySelector('.changeColorBtn');
const h2 = document.querySelector('.h2').innerText;
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');
const count = document.querySelector('.count');
const title = document.querySelector('.title');
const desc = document.querySelector('.desc');
const titleVal = document.querySelector('.titleVal');
const descLength = document.querySelector('.descLength');


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
        // const titleOG = document.querySelector('[name=title]').content;
        const title = document.title;
        const description = document.querySelector('[name=description]').content;

        let cleanData = totalText.replace(/\s/g, '');
        let totalCount = cleanData.length;

        let titleLength = title.length;
        let descLength;

        if (description !== null) {
            descLength = description.length;
        } else {
            descLength = 1;
        }

        return { totalCount, title, description, titleLength, descLength };
    } catch (err) {
        console.error(err);
    }
}
