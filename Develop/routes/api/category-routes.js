const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
  // be sure to include its associated Products
  include: {
    model:Product,
    attributes:["id","product_name","price","stock"],
  },
})

  .then((categoryData)=> res.json(categoryData))
  .catch((err) => {
  res.status(500).json(err)
  });
});

router.get('/:id', (req, res) => {
  console.log(res)
  // find one category by its `id` value
  Category.findOne({
    where: {
      id:req.params.id,
    },
  // be sure to include its associated Products
  include:{
    model:Product,
    attributes:["product_name","price","stock"]
  },
})
// used the following as a template
.then((categoryData) => {
  if (!categoryData) {
    res.status(404).json({
      message: "ERROR 404: PAGE NOT FOUND"
    })
    return;
  }
})

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
  // template
  .then((categoryData) => {
    if (!categoryData) {
      res.status(404).json({
        message: "ERROR 404: PAGE NOT FOUND"
      })
      return;
    }
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((categoryData) => {
    if (!categoryData) {
      res.status(404).json({
        message: "ERROR 404: PAGE NOT FOUND"
      })
      return;
    }
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
