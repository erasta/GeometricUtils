class AppProject {
    init() {
        this.points = [new THREE.Vector3(2, 15, 5), new THREE.Vector3(2, -13, 15), new THREE.Vector3(15, 3, 1)];

        this.initGui();

        // this.mesh = new THREE.Mesh(new THREE.TorusGeometry(), new THREE.MeshStandardMaterial({ color: 'red', transparent: true, opacity: 0.3 }));
        this.mesh = new THREE.Mesh(new THREE.SphereGeometry(10), new THREE.MeshStandardMaterial({ color: 'red', transparent: true, opacity: 0.3 }));
        // this.mesh = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshStandardMaterial({ color: 'red', transparent: true, opacity: 0.3 }));
        this.sceneManager.scene.add(this.mesh);
        this.sceneManager.scene.add(new THREE.Mesh(this.mesh.geometry, new THREE.MeshBasicMaterial({ color: 'yellow', wireframe: true })));
        
        this.applyGuiChanges();
    }

    applyGuiChanges() {
        this.sceneManager.scene.remove(this.line);
        this.sceneManager.scene.remove(this.out);
        (this.spheres || []).forEach(s => this.sceneManager.scene.remove(s));

        var actual = new ProjectToMesh(this.mesh.geometry).projectPolyline(this.points);
        
        this.line = new THREE.Line(new THREE.Geometry(), new THREE.LineBasicMaterial({ color: 'blue' }));
        this.line.geometry.vertices = this.points;
        this.sceneManager.scene.add(this.line);

        this.out = new THREE.Line(new THREE.Geometry(), new THREE.LineBasicMaterial({ color: 'green' }));
        this.out.geometry.vertices = actual;
        this.sceneManager.scene.add(this.out);

        this.spheres = this.points.map(p => {
            var s = new THREE.Mesh(new THREE.SphereGeometry(0.3), new THREE.MeshNormalMaterial());
            s.position.copy(p);
            this.sceneManager.scene.add(s);
        });
        // console.log('*****');actual.forEach(a => console.log(a.toArray()));
    }

    newPoint() {
        var e = new THREE.Euler(Math.random() * 0.6 - 0.3, Math.random() * 0.6 - 0.3, Math.random() * 0.6 - 0.3);
        this.points.push(this.points[this.points.length - 1].clone().applyEuler(e));
        this.applyGuiChanges();
    }

    initGui() {
        this.applyGuiChanges = this.applyGuiChanges.bind(this);
        this.gui = new dat.GUI({ autoPlace: true, width: 500 });
        this.gui.add(this, 'newPoint');
        // this.gui.add(this, 'currPoint').min(0).max(2).step(1).onChange(this.applyGuiChanges);
        // this.gui.add(this, 'y1').min(-15).max(15).step(0.01).onChange(this.applyGuiChanges);
        // this.gui.add(this, 'z1').min(-15).max(15).step(0.01).onChange(this.applyGuiChanges);
        // this.gui.add(this, 'x2').min(-15).max(15).step(0.01).onChange(this.applyGuiChanges);
        // this.gui.add(this, 'y2').min(-15).max(15).step(0.01).onChange(this.applyGuiChanges);
        // this.gui.add(this, 'z2').min(-15).max(15).step(0.01).onChange(this.applyGuiChanges);
        // this.gui.add(this, 'x3').min(-15).max(15).step(0.01).onChange(this.applyGuiChanges);
        // this.gui.add(this, 'y3').min(-15).max(15).step(0.01).onChange(this.applyGuiChanges);
        // this.gui.add(this, 'z3').min(-15).max(15).step(0.01).onChange(this.applyGuiChanges);
    }
}
