// Make NPF photos that are on their own row higher res
document.querySelectorAll('a[data-big-photo]').forEach(function(link) {
    if (link.closest('.npf_col') === null) {
        var photo = link.querySelector('img')
        photo.src = link.dataset.bigPhoto
    }
})

// Remove <br>s at the start of paragraphs, because NPF post creation is wonky
document.querySelectorAll('.reblog-item-body p > br').forEach(function (br) {
    if (br.parentElement.firstChild === br) {
        br.remove()
    }
})

// Layout photosets
document.querySelectorAll('[data-photoset-layout]').forEach(function (photoset) {
    var items = photoset.querySelectorAll('[data-photoset-item]')
    var itemIndex = 0
    var itemSpacing = 4
    var photosetWidth = photoset.clientWidth // no padding on this pls :(

    photoset.dataset.photosetLayout.split('').forEach(function (rowLayout) {
        var row = document.createElement('div')
        var columnCount = parseInt(rowLayout)
        var itemWidth = (photosetWidth - itemSpacing * (columnCount - 1)) / columnCount

        // Calculate row height
        var rowHeight = 1280
        for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            var item = items[itemIndex + columnIndex]
            var image = item.querySelector('img')
            var resizedHeight = image.height / image.width * itemWidth
            if (resizedHeight < rowHeight) {
                rowHeight = resizedHeight
            }
        }

        // Set item position + dimensions
        for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            var item = items[itemIndex + columnIndex]
            item.dataset.photosetItem = true
            row.appendChild(item)

            var image = item.querySelector('img')
            var resizedHeight = image.height / image.width * itemWidth
            var extraHeight = resizedHeight - rowHeight
            image.width = itemWidth
            if (extraHeight > 0) {
                image.style += "; margin-top: -" + extraHeight + "px"
            }
        }

        row.dataset.photosetRow = rowLayout
        row.style += "; height: " + rowHeight + "px"
        photoset.appendChild(row)
        
        itemIndex += columnCount
    })
})