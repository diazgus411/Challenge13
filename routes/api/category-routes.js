const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', async (req, res) => {
  // using await functions instead of .then function as a debugging step
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by id
router.get('/:id', async (req, res) => {
  try {   
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "Could not find a category with that id." });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
    // added console.log(err) for debugging.
    console.log(err);
  }
});

  // create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Could not find a category with that id.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
    console.log(err);
  }
});

  // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Could not find a category with that id.' });
      return;
    }
    res.status(200).json(categorydata);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
