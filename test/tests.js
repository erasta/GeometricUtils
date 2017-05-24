function vec(x, y, z) { return new THREE.Vector3(x, y, z); }
QUnit.test("closest point between segments", function(assert) {
    var closest = new SegmentsClosestPoints(vec(0, 0, 0), vec(10, 0, 0), vec(5, 5, 5), vec(5, -5, 5));
    assert.deepEqual(closest.point1, vec(5, 0, 0));
    assert.deepEqual(closest.point2, vec(5, 0, 5));
    assert.deepEqual(closest.dist, 5);
});

QUnit.test("project point to mesh", function(assert) {
    var geom = new THREE.BoxGeometry(10, 10, 10);
    var p = new ProjectToMesh(geom).projectPoint(vec(0, 1, 15));
    assert.deepEqual(p.face, 8);
    assert.deepEqual(p.point, vec(0, 1, 5));
    assert.deepEqual(p.dist, 10);
});
