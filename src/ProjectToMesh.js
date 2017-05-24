class ProjectToMesh {
    constructor(geometry) {
        this.geometry = geometry;
    }

    /**
    * Finds the closest point on the mesh to a given point
    **/
    projectPoint(point) {
        this.tri = this.tri || new THREE.Triangle();
        this.candPoint = this.candPoint || new THREE.Vector3();
        const verts = this.geometry.vertices;
        let closest = new THREE.Vector3(),
            closestFace, dist = 1e10;
        for (let i = 0; i < this.geometry.faces.length; ++i) {
            const f = this.geometry.faces[i];
            this.tri.set(verts[f.a], verts[f.b], verts[f.c]);
            this.tri.closestPointToPoint(point, this.candPoint);
            const candDist = point.distanceTo(this.candPoint);
            // console.log(Math.round(candDist*100)/100,this.candPoint.toArray(), '==', verts[f.a].toArray(), verts[f.b].toArray(), verts[f.c].toArray());
            if (candDist < dist) {
                // console.log('yes');
                dist = candDist;
                closest.copy(this.candPoint);
                closestFace = i;
            }
        }
        return { face: closestFace, point: closest, dist: dist };
    }
}

if (typeof module !== 'undefined') module.exports.ProjectToMesh = ProjectToMesh;
