{
    const folder = 'docs';
    const ext = 'pdf';
    
    const pdfs = [
        '1',
        'L-2-Plane Polar Coordinates',
        'L-3-Newtons-Laws',
        'L-4-Center of Mass',
        'L-5-Variable Mass',
        'L-6-Work Energy',
        'L-7-Collisions-COM-Lab',
        'L-8-Rotational Dyanamics-1-Moment of Inertia',
        'L-9-Rotational Dynamics-2',
        'L-10-Rigid Body Dyamics-1',
        'L-11-Rigid Body Dynamics-2-Gyroscope',
        'L11.1-Gyroscopes-Problems',
        'L12-Non Inertial Frame',
        'L-13-Special Theory of Relativity',
        'L13.1-Relativity-Problems-2',
        'L14-Central Force Motion',
        'L15-Harmonic Oscillator',
    ];
    
    const lecture__list = document.querySelector('.lecture__list');

    pdfs.forEach((pdf, index) => {
        const filename = `${folder}/${pdf}.${ext}`;
        const markup = `
        <li class="lecture__item">
            <a href="${filename}" target="_blank" class="lecture__link">
                <canvas id="the-canvas--${index + 1}"></canvas>
                <div class="lecture__content">
                    <img class="lecture__logo" src='img/pdf.png'>
                    <p class="lecture__name lecture__name--${index + 1}">  </p>
                    <p class="lecture__page lecture__page--${index + 1}">  </p>
                </div>
            </a>
        </li>
        `;
        lecture__list.insertAdjacentHTML('beforeend', markup);
    });

    const limit = pdf => {
        const len = 15;
        if (pdf.length >= len) {
            pdf = `${pdf.split('').slice(0, len).join('')}...`;
            return pdf;
        }
        return pdf;
    };

    // Rendering pdf
    const renderPdf = async (pdf, index) => {
        try {
            const filename = `${folder}/${pdf}.${ext}`;
            const canvas = document.querySelector(`#the-canvas--${index + 1}`);
            const ctx = canvas.getContext('2d');

            // Getting doc
            const doc = await pdfjsLib.getDocument(filename).promise;
            const pages = doc.numPages;

            // Getting page
            const pageNum = 1;
            const page = await doc.getPage(pageNum);

            // Getting viewport
            const scale = 2;
            const viewport = page.getViewport({ scale });
            console.log(viewport);
            canvas.height = viewport.height * 0.4;
            canvas.width = viewport.width;

            // Rendering to canvas
            const renderCtx = { canvasContext: ctx, viewport };
            await page.render(renderCtx).promise;

            // UI
            document.querySelector(`.lecture__name--${index + 1}`).textContent = limit(pdf);
            document.querySelector(`.lecture__page--${index + 1}`).textContent = `1 / ${pages}`;
        } catch (err) {
            console.log(err.message);
        }
    };

    pdfs.forEach(async (pdf, index) => {
        await renderPdf(pdf, index);
    });
}