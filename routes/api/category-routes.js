const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Find all categories
router.get('/', (req, res) => {
  try {
    const getCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(getCategories);
  } catch(err){
    res.status(500).json(err);
  }
});

//Find Category by ID
router.get('/:id', (req, res) => {
  try {
    const categoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryById) {
      res.status(404).json({message: 'No category found'});
      return;
    }
    res.status(200).json(categoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Add Category
router.post('/', (req, res) => {
  try {
    const addCategory = await Category.create(req.body);
    res.status(200).json(addCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update Category
router.put('/:id', (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategory) {
      res.status(404).json({ message: 'No category found.'});
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err){
    res.status(500).json(err);
  }
});

//Delete Category
router.delete('/:id', (req, res) => {
  try{
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    if(!deleteCategory) {
      res.status(404).json({ message: 'No category found'});
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
