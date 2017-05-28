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

    projectSegment(point1, face1, point2, face2, optionalOutput) {
        optionalOutput = optionalOutput || [];
        const verts = this.geometry.vertices;
        let subSegments = [{ point1, face1, point2, face2 }];
        while (subSegments.length) {
            const seg = subSegments.shift();
            if (seg.face1 === seg.face2) return optionalOutput;
            let e = this.sharedEdgeBetweenFaces(seg.face1, seg.face2);
            if (e) {
                const closest = new SegmentsClosestPoints(verts[e[0]], verts[e[1]], seg.point1, seg.point2);
                optionalOutput.push(closest.point1);
            } else {
                const mid = this.projectPoint(point1.clone().lerp(point2, 0.5));
                subSegments.unshift({ point1: mid.point, face1: mid.face, point2: point2, face2: face2 });
                subSegments.unshift({ point1: point1, face1: face1, point2: mid.point, face2: mid.face });
            }
        }
        return optionalOutput;
    }

    sharedEdgeBetweenFaces(faceIndex1, faceIndex2) {
        const f = this.geometry.faces[faceIndex1];
        const g = this.geometry.faces[faceIndex2];
        let e = [];
        if (f.a === g.a || f.a === g.b || f.a === g.c) e.push(f.a);
        if (f.b === g.a || f.b === g.b || f.b === g.c) e.push(f.b);
        if (f.c === g.a || f.c === g.b || f.c === g.c) e.push(f.c);
        if (e.length !== 2) return undefined;
        return e;
    }

    projectPolyline(poly) {
        if (poly.length === 0) return [];
        let last = this.projectPoint(poly[0]);
        let pointsOnMesh = [last.point];
        for (let i = 1; i < poly.length; ++i) {
            let next = this.projectPoint(poly[i]);
            this.projectSegment(last.point, last.face, next.point, next.face, pointsOnMesh);
            pointsOnMesh.push(next.point);
        }
        return pointsOnMesh;
    }
}

if (typeof module !== 'undefined') module.exports.ProjectToMesh = ProjectToMesh;
