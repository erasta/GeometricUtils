QUnit.test("closest point between segments", function(assert) {
    function vec(x, y, z) { return new THREE.Vector3(x, y, z); }
    var closest = new SegmentsClosestPoints(vec(0, 0, 0), vec(10, 0, 0), vec(5, 5, 5), vec(5, -5, 5));
    assert.deepEqual(closest.point1, vec(5, 0, 0));
    assert.deepEqual(closest.point2, vec(5, 0, 5));
    assert.deepEqual(closest.dist, 5);
});
