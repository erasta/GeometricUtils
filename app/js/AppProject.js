class AppProject {
    init() {
        this.points = [new THREE.Vector3(2, 15, 5), new THREE.Vector3(2, -13, 15), new THREE.Vector3(15, 3, 1)];
        this.currPoint = 2;
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.initGui();

        // this.mesh = new THREE.Mesh(new THREE.TorusGeometry(), new THREE.MeshStandardMaterial({ color: 'red', transparent: true, opacity: 0.3 }));
        this.mesh = new THREE.Mesh(new THREE.SphereGeometry(10), new THREE.MeshStandardMaterial({ color: 'red', transparent: true, opacity: 0.3 }));
        // this.mesh = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshStandardMaterial({ color: 'red', transparent: true, opacity: 0.3 }));
        this.sceneManager.scene.add(this.mesh);
        this.sceneManager.scene.add(new THREE.Mesh(this.mesh.geometry, new THREE.MeshBasicMaterial({ color: 'yellow', wireframe: true })));
        
        this.applyGuiChanges();
    }

    applyGuiChanges() {
        
        var actual = new ProjectToMesh(this.mesh.geometry).projectPolyline(this.points);
        
        this.sceneManager.scene.remove(this.line);
        this.line = new THREE.Line(new THREE.Geometry(), new THREE.LineBasicMaterial({ color: 'blue' }));
        this.line.geometry.vertices = this.points;
        this.sceneManager.scene.add(this.line);
        
        this.sceneManager.scene.remove(this.out);
        this.out = new THREE.Line(new THREE.Geometry(), new THREE.LineBasicMaterial({ color: 'green' }));
        this.out.geometry.vertices = actual;
        this.sceneManager.scene.add(this.out);
        
        this.sceneManager.scene.remove(this.sphere);
        this.sphere = new THREE.Mesh(new THREE.SphereGeometry(0.3), new THREE.MeshNormalMaterial());
        this.sphere.position.copy(this.points[this.currPoint]);
        this.sceneManager.scene.add(this.sphere);

        // console.log('*****');actual.forEach(a => console.log(a.toArray()));
    }
    
    newPoint() {
        var e = new THREE.Euler(Math.random() * 1.6 - 0.8, Math.random() * 1.6 - 0.8, Math.random() * 1.6 - 0.8);
        this.points.push(this.points[this.points.length - 1].clone().applyEuler(e));
        this.currPoint = this.points.length - 1;
        this.currPointCtrl.max(this.points.length - 1);
        this.setPoint();
    }
    
    setPoint() {
        this.x = this.points[this.currPoint].x
        this.y = this.points[this.currPoint].y
        this.z = this.points[this.currPoint].z
        this.currPointCtrl.updateDisplay();
        this.xCtrl.updateDisplay();
        this.yCtrl.updateDisplay();
        this.zCtrl.updateDisplay();
        this.applyGuiChanges();
    }

    setCurrCoords() {
        this.points[this.currPoint].set(this.x, this.y, this.z);
        this.applyGuiChanges();
    }

    initGui() {
        this.applyGuiChanges = this.applyGuiChanges.bind(this);
        this.gui = new dat.GUI({ autoPlace: true, width: 500 });
        this.gui.add(this, 'newPoint');
        this.currPointCtrl = this.gui.add(this, 'currPoint').min(0).max(2).step(1).onChange(this.setPoint.bind(this));
        this.xCtrl = this.gui.add(this, 'x').min(-15).max(15).step(0.01).onChange(this.setCurrCoords.bind(this));
        this.yCtrl = this.gui.add(this, 'y').min(-15).max(15).step(0.01).onChange(this.setCurrCoords.bind(this));
        this.zCtrl = this.gui.add(this, 'z').min(-15).max(15).step(0.01).onChange(this.setCurrCoords.bind(this));
    }
}
