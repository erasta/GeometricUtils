function vec(x, y, z) { return new THREE.Vector3(x, y, z); }

QUnit.test("closest point between segments", function(assert) {
    var actual = new SegmentsClosestPoints(vec(0, 0, 0), vec(10, 0, 0), vec(5, 5, 5), vec(5, -5, 5));
    assert.deepEqual(actual.point1, vec(5, 0, 0));
    assert.deepEqual(actual.point2, vec(5, 0, 5));
    assert.deepEqual(actual.dist, 5);
});

QUnit.test("project point to mesh", function(assert) {
    var geom = new THREE.BoxGeometry(10, 10, 10);
    var actual = new ProjectToMesh(geom).projectPoint(vec(0, 1, 15));
    assert.deepEqual(actual.face, 8);
    assert.deepEqual(actual.point, vec(0, 1, 5));
    assert.deepEqual(actual.dist, 10);
});

QUnit.test("project line to triangle", function(assert) {
    var geom = new THREE.Geometry();
    geom.vertices.push(vec(0, 0, 0), vec(10, 0, 0), vec(0, 10, 0))
    geom.faces.push(new THREE.Face3(0, 1, 2));
    var actual = new ProjectToMesh(geom).projectPolyline([vec(1, 1, 1), vec(2, 2, 2)]);
    assert.deepEqual(actual, [vec(1, 1, 0), vec(2, 2, 0)]);
});

QUnit.test("project line to plane", function(assert) {
    var geom = new THREE.PlaneGeometry(10, 10);
    var actual = new ProjectToMesh(geom).projectPolyline([vec(-1, 1, 1), vec(-2, -4, 2)]);
    assert.deepEqual(actual, [vec(-1, 1, 0), vec(-1.5, -1.5, 0), vec(-2, -4, 0)]);
});

QUnit.test("project line to mesh", function(assert) {
    var geom = new THREE.BoxGeometry(10, 10, 10);
    var actual = new ProjectToMesh(geom).projectPolyline([vec(-3, -4, 15), vec(15, 3, 4)]);
    actual.forEach(a => console.log(a.toArray()));
    // assert.deepEqual(p.face, 8);
    // assert.deepEqual(p.point, vec(0, 1, 5));
    // assert.deepEqual(p.dist, 10);
});
