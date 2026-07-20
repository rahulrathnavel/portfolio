import * as THREE from 'three'
import { createActivitiesTexture, createContactLabelTexture, profile } from '../../PortfolioData.js'

export default class InformationSection
{
    constructor(_options)
    {
        this.time = _options.time
        this.resources = _options.resources
        this.objects = _options.objects
        this.areas = _options.areas
        this.tiles = _options.tiles
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false

        this.setStatic()
        this.setLinks()
        this.setActivities()
        this.setTiles()
    }

    setStatic()
    {
        this.objects.add({
            base: this.resources.items.informationStaticBase.scene,
            collision: this.resources.items.informationStaticCollision.scene,
            floorShadowTexture: this.resources.items.informationStaticFloorShadowTexture,
            offset: new THREE.Vector3(this.x, this.y, 0),
            mass: 0
        })
    }

    setLinks()
    {
        this.links = {
            x: 1.95,
            y: -1.5,
            halfExtents: { x: 1, y: 1 },
            distanceBetween: 2.4,
            items: []
        }
        this.links.labelWidth = this.links.halfExtents.x * 2 + 1
        this.links.labelGeometry = new THREE.PlaneGeometry(this.links.labelWidth, this.links.labelWidth * 0.25, 1, 1)
        this.links.labelOffset = -1.6
        this.links.container = new THREE.Object3D()
        this.links.container.matrixAutoUpdate = false
        this.container.add(this.links.container)

        this.links.options = [
            { href: profile.github, label: 'GitHub' },
            { href: profile.linkedin, label: 'LinkedIn' },
            { href: profile.email, label: 'Email' },
            { href: profile.resume, label: 'Resume' }
        ]

        let index = 0
        for(const option of this.links.options)
        {
            const item = {}
            item.x = this.x + this.links.x + this.links.distanceBetween * index
            item.y = this.y + this.links.y
            item.href = option.href
            item.area = this.areas.add({
                position: new THREE.Vector2(item.x, item.y),
                halfExtents: new THREE.Vector2(this.links.halfExtents.x, this.links.halfExtents.y)
            })
            item.area.on('interact', () => window.open(option.href, '_blank', 'noopener'))

            item.texture = createContactLabelTexture(option.label)
            item.texture.magFilter = THREE.NearestFilter
            item.texture.minFilter = THREE.LinearFilter
            item.labelMesh = new THREE.Mesh(
                this.links.labelGeometry,
                new THREE.MeshBasicMaterial({ color: 0xffffff, alphaMap: item.texture, depthTest: true, depthWrite: false, transparent: true })
            )
            item.labelMesh.position.x = item.x + this.links.labelWidth * 0.5 - this.links.halfExtents.x
            item.labelMesh.position.y = item.y + this.links.labelOffset
            item.labelMesh.matrixAutoUpdate = false
            item.labelMesh.updateMatrix()
            this.links.container.add(item.labelMesh)
            this.links.items.push(item)
            index++
        }
    }

    setActivities()
    {
        this.activities = {}
        this.activities.x = this.x
        this.activities.y = this.y - 10
        this.activities.multiplier = 5.5
        this.activities.geometry = new THREE.PlaneGeometry(2 * this.activities.multiplier, 1 * this.activities.multiplier, 1, 1)
        this.activities.texture = createActivitiesTexture()
        this.activities.texture.magFilter = THREE.NearestFilter
        this.activities.texture.minFilter = THREE.LinearFilter
        this.activities.material = new THREE.MeshBasicMaterial({ color: 0xffffff, alphaMap: this.activities.texture, transparent: true })
        this.activities.mesh = new THREE.Mesh(this.activities.geometry, this.activities.material)
        this.activities.mesh.position.x = this.activities.x
        this.activities.mesh.position.y = this.activities.y
        this.activities.mesh.matrixAutoUpdate = false
        this.activities.mesh.updateMatrix()
        this.container.add(this.activities.mesh)
    }

    setTiles()
    {
        this.tiles.add({
            start: new THREE.Vector2(this.x - 1.2, this.y + 13),
            delta: new THREE.Vector2(0, -20)
        })
    }
}
