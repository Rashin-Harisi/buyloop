/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Category module and routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategory:
 *       type: object
 *       required:
 *         - name
 *         - icon
 *       properties:
 *         name:
 *           type: string
 *         slug:
 *           type: string
 *         icon:
 *           type: string
 *         parent:
 *           type: string
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: create a new category 
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       201:
 *         description: category created successfully
 *   get:
 *     summary: get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: get all categories successfully
 */
/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: delete a category by id
 *     parameters:
 *       -  in: path
 *          name: id
 *          type: string 
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: category is deleted successfully
 */
