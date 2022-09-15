const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const findAllCategories = await Category.findAll({
      include: { model: Product },
    });
    res.status(200).json(findAllCategories)
  } catch (error) {
    res.status(500).json(error.message)
  }
});


// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const oneCategoryData = await Category.findByPk(req.params.id, {
      include: { model: Product },
    });
    if (!oneCategoryData) {
      res.status(404).json({ message: 'No Category found with this id' });
      return;
    }
    res.status(200).json(oneCategoryData);
  } catch (error) {
    res.status(500).json(error.message)
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json({
      message: "New category succesfully created!",
      newCategory
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});


// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedCategory) => {
      if (!updatedCategory) {
        res.status(404).json({
          message: "The Category id is not found!"
        });
        return;
      }
      res.json({
        message: "Category successfully updated!",
        updatedCategory
      });
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryToBeDeleted = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryToBeDeleted) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.status(200).json(categoryToBeDeleted);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
