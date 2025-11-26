import puppeteer from "puppeteer"

export default defineEventHandler(async (event) => {
    // const TemplatePedigreeBase = await useStorage('assets:templates').getItem(`pedigree.base.html`) as string
    const TemplatePedigreeFront = await useStorage('assets:templates').getItem(`pedigree.front.html`) as string
    // const TemplatePedigreeBack = await useStorage('assets:templates').getItem(`pedigree.back.html`) as string

    const template = TemplatePedigreeFront

    const assets = {
        images: {
            border: await loadAssetAsDataUrl('images/border.png'),
            fcm_logo: await loadAssetAsDataUrl('images/fcm.png'),
        },
        fonts: {
            headline: await loadAssetAsDataUrl('fonts/matura.ttf'),
            text: await loadAssetAsDataUrl('fonts/open-sans-variable.ttf'),
        },
    }

    const data = {
        name: `GENTLEMAN OF THE YEAR SYKES`,
        kennel: `Gladword's`,
        kennelNameFirst: true,
        displayName: `Gladword's GENTLEMAN OF THE YEAR SYKES`,
        breed: `Golden Retriever`,
        color: `golden`,
        birthDate: `23.05.2023`,
        sex: `Rüde`,
        studbookNumber: `DRV - 05.003/23`,
        chipNumber: `276095611013784`,
        address: `Kerstin Freuwört<br>Beispielstraße 12<br>12345 Musterstadt / OT Musterstadt`,
        litter: {
            name: "G-Wurf",
            maleCount: 99,
            femaleCount: 99,
        },
        father: {
            displayName: "Sample Father",
            studbookNumber: "DRV - 00.000/00",
            chipNumber: "276095611013784",
            birthDate: "01.01.2020",
            color: "golden",
            size: "59cm",
            awardsLength1: `AAAAA<br>BBBBB<br>CCCCC`,
            awardsLength2: `AAAA<br>BBBB<br>CCCC`,
            awardsLength3: `AAA<br>BBB<br>CCC`,
            awardsLength4: `AA BB CC`,
            father: {
                name: "Sample Grandfather",
            },
            mother: {
                id: 5,
                name: "Sample Grandmother",
            },
        },
        mother: {
            name: "Sample Mother",
            father: {
                name: "Sample Grandfather",
            },
            mother: {
                name: "Sample <span style='color: blue'>Grandmother</span>",
            },
        },
    }

    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
    const page = await browser.newPage()
    await page.setContent(hydrate(template, assets, data), { waitUntil: 'networkidle0' })
    const pdfBuffer = await page.pdf({ format: 'A4', landscape: true, height: '210mm', width: '297mm', printBackground: true })
    await browser.close()

    return pdfBuffer
})

function hydrate(template: string, assets: any, data: any): string {
    try {
        return new Function('data', 'assets', 'return `' + template + '`')(data, assets)
    } catch (error) {
        console.error('Error hydrating template:', error)
        throw new Error('Failed to hydrate template')
    }
}

async function loadAssetAsDataUrl(path: string): Promise<string> {
    const fileContent = await useStorage('assets').getItemRaw<ArrayBuffer>(path)
    if (!fileContent) {
        throw new Error(`Asset not found: ${path}`)
    }
    const base64Data = Buffer.from(fileContent).toString('base64')
    const extension = path.split('.').pop()?.toLowerCase()
    let mimeType = 'application/octet-stream'
    if (extension === 'png') mimeType = 'image/png'
    else if (extension === 'jpg' || extension === 'jpeg') mimeType = 'image/jpeg'
    else if (extension === 'ttf') mimeType = 'font/ttf'
    else if (extension === 'otf') mimeType = 'font/otf'
    return `data:${mimeType};base64,${base64Data}`
}
