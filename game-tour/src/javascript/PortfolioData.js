import * as THREE from 'three'

export const profile = {
    name: 'Rahul Rathnavel',
    role: 'Applied AI/ML Engineer',
    headline: 'Useful intelligent systems for the real world',
    github: 'https://github.com/rahulrathnavel',
    linkedin: 'https://www.linkedin.com/in/rahulrathnavel/',
    email: 'mailto:rahulrathnavell5@gmail.com',
    resume: 'https://rahulrathnavel.dev/resume/Rahul-Rathnavel-Resume.pdf',
    portfolio: 'https://rahulrathnavel.dev/'
}

export const portfolioProjects = [
    {
        name: 'SmartOps',
        category: 'AIOps / national finalist',
        href: 'https://rahulrathnavel.dev/?app=work',
        color: '#ef6347',
        pages: [
            ['National finalist', 'SmartOps reached the TECHgium final stage as one of 34 selected teams from more than 62,000 registrations.', 'TOP 1%'],
            ['Observe → Diagnose → Resolve', 'A human-reviewed incident workflow that reads signals, proposes remediation, and learns from SRE feedback.', 'HUMAN-IN-THE-LOOP'],
            ['Built for the hard parts', 'Spatial-temporal GNN reasoning, Qwen diagnostics, EKS, Terraform, Prometheus, CloudWatch, React, and D3.', 'AIOPS MVP']
        ]
    },
    {
        name: 'Amazon ML Challenge',
        category: 'NLP regression / Cyber Titans',
        href: 'https://rahulrathnavel.dev/?app=proof',
        color: '#ffb347',
        pages: [
            ['Rank 900 → Rank 83', 'A price-prediction run refined through modelling, validation, and the discipline to learn from leaderboard drops.', 'RANK 83'],
            ['45.35 SMAPE', 'The final submission improved stability with DeBERTa-v3-base, hybrid pooling, custom loss, and outlier controls.', 'FINAL SCORE'],
            ['Team effort, AI backbone', 'Rahul owned the core model work, training, submissions, and cloud deployment while collaborating with Cyber Titans.', 'AMAZON ML 2025']
        ]
    },
    {
        name: 'Omni RAG',
        category: 'Live multimodal retrieval',
        href: 'https://huggingface.co/spaces/RathnavelRahul/omni',
        color: '#72d1af',
        pages: [
            ['Answers need receipts', 'A live multimodal RAG application that returns answers with the exact PDF evidence behind them.', 'LIVE DEMO'],
            ['Hybrid retrieval', 'Dense FAISS retrieval and BM25 work together so a useful document does not disappear just because one retriever misses it.', 'FAISS + BM25'],
            ['Evidence-first UX', 'The system shows the supporting page rather than asking people to trust a confident-looking paragraph.', 'LLAMA 3']
        ]
    },
    {
        name: 'Smart Glass',
        category: 'Edge AI / accessibility',
        href: 'https://rahulrathnavel.dev/?app=work',
        color: '#a99dff',
        pages: [
            ['Assistance without surrendering privacy', 'A wearable visual-input prototype paired with a Flutter app for object, text, and face assistance.', 'EDGE AI'],
            ['Offline by design', 'The concept prioritises practical local processing where a person should not need to trade privacy for assistance.', 'ESP32-CAM'],
            ['From hardware to app flow', 'The project connects embedded capture, a mobile interface, and accessible feedback into one usable prototype.', 'FLUTTER']
        ]
    },
    {
        name: 'Voice Surrogate',
        category: 'Android / accessibility',
        href: 'https://github.com/rahulrathnavel/voice-surrogate',
        color: '#55c3f0',
        pages: [
            ['A voice should not wait for the cloud', 'An Android accessibility app for non-speaking individuals, shaped around on-device bilingual smart replies.', 'ANDROID'],
            ['Speech in, response out', 'The core interaction turns spoken input into a considered reply and supports text-to-speech output.', 'ON-DEVICE'],
            ['Built for a real conversation', 'Latency, privacy, and understandable interaction mattered more than a flashy demo.', 'BILINGUAL']
        ]
    },
    {
        name: 'Raki Chat',
        category: 'Mobile product / realtime',
        href: 'https://github.com/rahulrathnavel/Raki-Chatapp',
        color: '#f06b9a',
        pages: [
            ['A chat app with a maintainable core', 'Raki is a Kotlin and Jetpack Compose application built for real-time conversations.', 'MOBILE'],
            ['The essentials done deliberately', 'Firebase authentication, real-time messaging, and MVVM structure keep the product behaviour clear.', 'FIREBASE'],
            ['From screen to APK', 'The project is available as an installable Android build as well as source code.', 'JETPACK COMPOSE']
        ]
    },
    {
        name: 'Biometric Voting',
        category: 'Research prototype / blockchain',
        href: 'https://github.com/rahulrathnavel/BlockChain_Voting_System...',
        color: '#d99b5b',
        pages: [
            ['Auditable, not overclaimed', 'A controlled research prototype exploring how blockchain auditability can sit beside biometric verification.', 'PROTOTYPE'],
            ['Multiple layers, one question', 'A Next.js interface, Solidity, Flask services, and Arduino hardware were combined to explore the workflow.', 'SOLIDITY'],
            ['A careful boundary', 'This is presented as an experiment, never as a claim that a demo is a production election system.', 'RESEARCH']
        ]
    },
    {
        name: 'Job Signal Verification',
        category: 'Private build / trust',
        href: 'mailto:rahulrathnavell5@gmail.com?subject=Job%20signal%20verification%20project',
        color: '#9acb59',
        pages: [
            ['A better first filter', 'A private workflow for classifying suspicious job listings and matching opportunities to a supplied résumé.', 'PRIVATE WORK'],
            ['Structured input from public links', 'The system explores extraction and automated pre-fill from selected public job sources.', 'MATCHING'],
            ['Names withheld, work visible', 'The portfolio shares the problem space and engineering scope without exposing a client or private dataset.', 'CONFIDENTIAL']
        ]
    },
    {
        name: 'Encrypted Smart-Grid ML',
        category: 'Private research / privacy',
        href: 'mailto:rahulrathnavell5@gmail.com?subject=Encrypted%20smart-grid%20ML%20project',
        color: '#8fc7dc',
        pages: [
            ['Useful models should respect sensitive data', 'A private ML research workflow exploring predictions over protected smart-grid data.', 'PRIVACY ML'],
            ['Protection is part of the requirement', 'The work focuses on preserving the confidentiality of the dataset and target data through the prediction flow.', 'ENCRYPTED DATA'],
            ['Research, not a magic trick', 'The project is framed around privacy-preserving engineering questions, not vague claims about impossible security.', 'RESEARCH']
        ]
    }
]

function wrapText(context, value, x, y, maxWidth, lineHeight, maxLines = 4)
{
    const words = value.split(' ')
    let line = ''
    let lineIndex = 0

    for(const word of words)
    {
        const candidate = line ? `${line} ${word}` : word
        if(context.measureText(candidate).width > maxWidth && line)
        {
            context.fillText(line, x, y + lineIndex * lineHeight)
            line = word
            lineIndex++
            if(lineIndex >= maxLines - 1)
            {
                break
            }
        }
        else
        {
            line = candidate
        }
    }

    if(lineIndex < maxLines)
    {
        context.fillText(line, x, y + lineIndex * lineHeight)
    }
}

function drawGrid(context, width, height)
{
    context.save()
    context.strokeStyle = 'rgba(255,255,255,0.12)'
    context.lineWidth = 2
    for(let x = 0; x < width; x += 70)
    {
        context.beginPath()
        context.moveTo(x, 0)
        context.lineTo(x, height)
        context.stroke()
    }
    for(let y = 0; y < height; y += 70)
    {
        context.beginPath()
        context.moveTo(0, y)
        context.lineTo(width, y)
        context.stroke()
    }
    context.restore()
}

export function createProjectSlide(project, page, index)
{
    const canvas = document.createElement('canvas')
    canvas.width = 1400
    canvas.height = 920
    const context = canvas.getContext('2d')
    const [title, detail, stat] = page

    context.fillStyle = '#111827'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = project.color
    context.fillRect(0, 0, 48, canvas.height)
    context.fillStyle = 'rgba(255,255,255,0.07)'
    context.beginPath()
    context.arc(1190, 160, 220, 0, Math.PI * 2)
    context.fill()
    drawGrid(context, canvas.width, canvas.height)

    context.fillStyle = project.color
    context.font = '700 40px monospace'
    context.fillText(`RR / ${String(index + 1).padStart(2, '0')} / ${project.category.toUpperCase()}`, 105, 120)

    context.fillStyle = '#fff9ed'
    context.font = '800 106px Arial, sans-serif'
    wrapText(context, title, 105, 290, 1080, 120, 3)

    context.fillStyle = '#d7e0ea'
    context.font = '500 46px Arial, sans-serif'
    wrapText(context, detail, 105, 600, 1050, 62, 3)

    context.fillStyle = project.color
    context.fillRect(105, 785, 560, 76)
    context.fillStyle = '#111827'
    context.font = '800 38px Arial, sans-serif'
    context.fillText(stat, 135, 837)

    return canvas.toDataURL('image/png')
}

function createAlphaTexture(draw)
{
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 512
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    draw(context, canvas)
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
}

export function createFloorLabelTexture(label)
{
    return createAlphaTexture((context, canvas) =>
    {
        context.fillStyle = '#ffffff'
        context.font = '800 180px Arial, sans-serif'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(label.toUpperCase(), canvas.width / 2, canvas.height / 2)
    })
}

export function createContactLabelTexture(label)
{
    return createAlphaTexture((context, canvas) =>
    {
        context.fillStyle = '#ffffff'
        context.font = '800 155px Arial, sans-serif'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(label.toUpperCase(), canvas.width / 2, canvas.height / 2)
    })
}

export function createActivitiesTexture()
{
    return createAlphaTexture((context, canvas) =>
    {
        context.fillStyle = '#ffffff'
        context.font = '800 122px Arial, sans-serif'
        context.textAlign = 'center'
        context.fillText('APPLIED AI / ML', canvas.width / 2, 125)
        context.fillText('DATA SYSTEMS / SOFTWARE', canvas.width / 2, 265)
        context.fillText('EVIDENCE OVER HYPE', canvas.width / 2, 405)
    })
}

export function createHeroTexture(lines)
{
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 720
    const context = canvas.getContext('2d')
    context.fillStyle = '#fff7e8'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#ef6347'
    context.fillRect(0, 0, 54, canvas.height)
    context.fillStyle = '#0f172a'
    context.font = '800 210px Arial, sans-serif'
    context.textAlign = 'center'
    context.fillText(lines[0], canvas.width / 2, 275)
    context.fillStyle = '#ef6347'
    context.font = '800 102px Arial, sans-serif'
    context.fillText(lines[1], canvas.width / 2, 495)
    context.fillStyle = '#334155'
    context.font = '700 48px monospace'
    context.fillText(lines[2], canvas.width / 2, 615)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.needsUpdate = true
    return texture
}
