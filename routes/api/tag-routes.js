const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// HTTP GET all tags
// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const findAllTags = await Tag.findAll({
      include: { model: Product }
    });
    res.status(200).json(findAllTags)
  } catch (error) {
    res.status(500).json(error.message)
  }
});

// HTTP GET single tag with id
// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const oneTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!oneTagData) {
      res.status(404).json({ message: "No tag found with this id" });
      return;
    }
    res.status(200).json(oneTagData);
  } catch (error) {
    res.status(500).json(error.message)
  }
});

// HTTP POST new tag
// create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json({
      message: "New tag succesfully created!",
      newTag
    })
  } catch (error) {
    res.status(400).json(error.message);
  }
});


//HTTP UPDATE TAG
// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedTag) => {
      if (!updatedTag) {
        res.status(404).json({
          message: "The tag id is not found!"
        });
        return;
      }
      res.json({
        message: "Tag successfully updated!",
        updatedTag
      });
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
});

//HTTP DELETE TAG
// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagToBeDeleted = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagToBeDeleted) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.status(200).json(tagToBeDeleted);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


module.exports = router;
