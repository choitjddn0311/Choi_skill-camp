const dropbox = document.querySelector("#dropBox")
		const photobox = document.querySelector("#photoBox")
		const overHandler = (event) => {
			event.preventDefault()
			dropbox.style.backgroundColor = "yellow"
		}
		const leaveHandler = (event) => {
			event.preventDefault()
			dropbox.style.backgroundColor = "white"
		}
		const dropHandler = (event) => {
			event.preventDefault()
			dropbox.style.backgroundColor = "white"
			const photos = event.dataTransfer.items
			//console.log(photos)
			showPhotos(photos)
		}
		const showPhotos = (photos) => {
			if( ! photos ) return
			for(let i=0; i<photos.length; i++) {
				let p = photos[i]
				if( p.kind === 'file' && p.type.match('^image/')) {
					let reader = new FileReader()
					let file = p.getAsFile()
					reader.readAsDataURL(file)
					reader.onload = (event) => {
						const src = event.target.result
						const img = `
							<div class='photo'>
								<span onclick='removePhoto(this)'>X</span>
								<img src='${src}'onclick='scaleImg("${src}")'>
							</div>
						`
						photobox.innerHTML += img
					}
				}
			}
		}

        const removePhoto = (e) => e.parentElement.remove()
		const imgModal = document.getElementById('imgModal')
		const modalImg = document.getElementById('modalImage')
        const del = document.getElementById('del')
		const close = document.getElementById('close')
        del.addEventListener('click' , () => {
            photobox.innerHTML =  '';
        })

		const scaleImg = (src) => {
			modalImg.src = src
			imgModal.style.display = "flex"
		};
		close.addEventListener('click' , () => {
			imgModal.style.display = "none"
		})

