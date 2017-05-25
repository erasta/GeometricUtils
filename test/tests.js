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

QUnit.test("project line to mesh", function(assert) {
    var geom = new THREE.BoxGeometry(10, 10, 10);
    var actual = new ProjectToMesh(geom).projectPolyline([vec(0, 15, 1), vec(0, 0, 15), vec(0, -15, 1)]);
    console.log(actual);
    // assert.deepEqual(p.face, 8);
    // assert.deepEqual(p.point, vec(0, 1, 5));
    // assert.deepEqual(p.dist, 10);
});
